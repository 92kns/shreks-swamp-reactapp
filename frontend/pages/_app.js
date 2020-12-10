import App, {Container} from 'next/app';
import Page from '../components/Page';
import {ApolloProvider} from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App {
    // surface page values i.e. items?page=1,2,3...
    // explicityly need to do this

    static async getInitialProps ( {Component, ctx}) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        // this exposes query 
        pageProps.query = ctx.query;
        return {pageProps};
    }
    // above happens first before any rendering happens, exposing it for below
    // 
    render() {
        
        const {Component, apollo, pageProps} = this.props;

        return(
            <Container>
                <ApolloProvider client = {this.props.apollo}>
                    <Page>
                        <Component {...pageProps}/>
                    </Page>
                </ApolloProvider>
            </Container>
        );
    }

}

export default withData(MyApp);