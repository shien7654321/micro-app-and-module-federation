import webpack from 'webpack';

interface ICompilationInfo {
    mfName: string;
    mfFilename: string;
}

class MfEntryPlugin {
    private readonly compilationInfo: ICompilationInfo;

    constructor() {
        this.compilationInfo = {
            mfName: '',
            mfFilename: '',
        };
    }

    private updateCompilationInfo(compilation) {
        const {plugins} = compilation.options;
        if (Array.isArray(compilation.options.plugins)) {
            const {_options: mfPluginOption} = plugins.find(
                (plugin) => plugin instanceof webpack.container.ModuleFederationPlugin
                    // @ts-ignore
                    // eslint-disable-next-line no-underscore-dangle
                    && typeof plugin._options.exposes === 'object' && Object.keys(plugin._options.exposes).length,
            );
            if (mfPluginOption) {
                this.compilationInfo.mfName = mfPluginOption.name;
                this.compilationInfo.mfFilename = mfPluginOption.filename;
            }
        }
    }

    private replace(source: string): string {
        const regExp = new RegExp(this.compilationInfo.mfName + '\\s?=');
        const newMfNamePattern = '(function(){if("object"==typeof globalThis)return globalThis;try{return this||' +
            'new Function("return this")()}catch(e){if("object"==typeof window)return window}}())' +
            `.${this.compilationInfo.mfName}=`;
        return source.replace(regExp, newMfNamePattern);
    }

    private run(compilation) {
        this.updateCompilationInfo(compilation);
        if (!this.compilationInfo.mfName || !this.compilationInfo.mfFilename) {
            return;
        }
        compilation.hooks.processAssets.tap(
            {
                name: 'MfEntryPlugin',
            },
            assets => {
                Object.keys(assets).forEach((filename) => {
                    // 仅处理模块联邦生成的入口文件
                    if (filename.endsWith(this.compilationInfo.mfFilename)) {
                        const source = assets[filename].source();
                        // 处理并重写文件内容
                        compilation.assets[filename] = new webpack.sources.RawSource(this.replace(source));
                    }
                });
            }
        );
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('MfEntryPlugin', (compilation) => this.run(compilation));
    }
}

export default MfEntryPlugin;
