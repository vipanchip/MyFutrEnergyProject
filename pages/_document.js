import Document, { Html, Head, Main, NextScript } from "next/document";
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

class MyDoc extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }
    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDoc.getInitialProps = async ctx => {
    const cache = createCache()
    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: App => props => (
                <StyleProvider cache={cache}>
                    <App {...props} />
                </StyleProvider>
            )
        })

    const initialProps = await Document.getInitialProps(ctx)
    const style = extractStyle(cache, true)
    return {
        ...initialProps,
        styles: (
            <>
                {initialProps.styles}
                <style dangerouslySetInnerHTML={{ __html: style }} />
            </>
        )
    }
};

export default MyDoc