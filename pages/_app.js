import App from "next/app";
import Head from "next/head";
// import "@/styles/base.css";
// import { withAuth } from "@/utils/auth";
import cookies from "next-cookies";
import { mapbox_style_url, olMap_ext_script_url, olMap_script_url, public_dir } from "lib/constants";
import NoInternetComponent from "components/no-internet";
// import PageLoader from "@/components/page-loader";
import { Offline, Online } from "react-detect-offline";
// import "@/styles/custom.scss";
// import "@/styles/default.scss";
import "styles/_index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";



import Router from "next/router";
import NProgress from "nprogress";
import "styles/nprogress.scss";
NProgress.configure({
  easing: "ease",
  speed: 500,
});
Router.events.on("routeChangeStart", () => {
  NProgress.set(0.2);
});
Router.events.on("routeChangeComplete", () => {
  NProgress.set(1);
});
Router.events.on("routeChangeError", () => {
  NProgress.set(1);
});

import { get_item_cookie, set_item_cookie } from "lib/helper";
import dynamic from "next/dynamic";
// react-tour
const Joyride = dynamic(() => import("react-joyride"), { ssr: false });
import * as gtag from "lib/gtag";

class MyApp extends App {
  state = {
    isOffline: false,
    isLoading: false,

    steps: [
      {
        target: ".web-logo",
        content: "Welcome to Futr.Energy",
        placement: "auto",
        disableBeacon: true,
        title: "Futr.Energy",
      },
      {
        target: ".sidemenu",
        content: "Here you can find everything in.",
        placement: "right",
        disableBeacon: true,
        title: "Futr.Energy",
      },
    ],
    run: false,
  };

  // handleChangeFunc = (value) => this.setState({ isOffline: value });

  handleRouterChange = (url) => {
    gtag.pageview(url);
  };

  // componentDidMount() {
  //   try {
  //     const { email = null, authToken: token = null } = cookies({});
  //     // HOC func to check whether authToken is valid or not
  //     withAuth(email, token);

      // if (typeof window !== undefined && "navigator" in window) {
      //   // ref to read - https://alligator.io/js/navigator-online/
      //   window.addEventListener("offline", () => this.handleChangeFunc(true));
      //   window.addEventListener("online", () => this.handleChangeFunc(false));
      // }

      // Router.events.on('routeChangeStart', () => {
      //   this.setState({ isLoading: true })
      // })
      // Router.events.on('routeChangeComplete', () => {
      //   this.setState({ isLoading: false })
      // })
      // Router.events.on('routeChangeError', () => {
      //   this.setState({ isLoading: false })
      // })

      // google analytics 4
      // const router = this.props.router;
      // router.events.on('routeChangeComplete', this.handleRouterChange);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

  componentWillUnmount() {
    // window.removeEventListener("offline", () => this.handleChangeFunc(true));
    // window.removeEventListener("online", () => this.handleChangeFunc(false));
    // google analytics 4
    // const router = this.props.router;
    // router.events.off('routeChangeComplete', this.handleRouterChange);
  }

  render() {
    const { Component, pageProps } = this.props;
    const customStyleJoyride = {
      // ref to read -
      // https://github.com/gilbarbara/react-joyride/blob/3e08384415a831b20ce21c8423b6c271ad419fbf/src/styles.js
      options: {
        primaryColor: "#5E81F4",
        textColor: "#1C1D21",
        overlayColor: "rgba(0 ,0, 0, .6)",
      },
      tooltip: {
        fontFamily: "inherit",
        fontSize: "1rem",
        fontWeight: "normal",
      },
      buttonSkip: {
        fontWeight: "normal",
      },
      buttonNext: {
        fontWeight: "normal",
      },
      buttonBack: {
        fontWeight: "normal",
      },
      buttonClose: {
        display: "none",
      },
      tooltipTitle: {
        color: "#5E81F4",
      },
    };

    // if (this.state.isOffline) {
    //   return (
    //     <>
    //       <Head>
    //         <link
    //           rel="icon"
    //           type="image/ico"
    //           sizes="30x29"
    //           href={`${public_dir}images/favicon.ico`}
    //         />
    //         <meta
    //           name="viewport"
    //           content="width=device-width, initial-scale=1"
    //           key="viewport"
    //         />
    //         <title>No Internet</title>
    //       </Head>
    //       <NoInternetComponent />
    //     </>
    //   );
    // }

    return (
      <>
        <Head>
          <link
            rel="icon"
            type="image/ico"
            // sizes="30x29"
            // href={`${public_dir}images/favicon.ico`}
            sizes="32x32"
            href="https://ik.imagekit.io/visualai/icons/favicon-futr.cloud/favicon_ZbqStHBx3.png?tr=q-100,w-32,h-32,cm-pad_resize"
          />
          {/* <link rel="dns-prefetch" href="https://dsdpucchrnz7b.cloudfront.net" /> */}
          {/* <link rel="preconnect" href="https://dsdpucchrnz7b.cloudfront.net" /> */}
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&amp;display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&amp;display=swap"
            rel="stylesheet"
          />

          <link rel="dns-prefetch" href="//ik.imagekit.io/visualai/" />
          <link rel="preconnect" href="//ik.imagekit.io/visualai/" />
          <link
            rel="preload"
            href="//ik.imagekit.io/visualai/la-brands-400_lzFspGhMk.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="//ik.imagekit.io/visualai/la-regular-400_OlzGPBJpo.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="//ik.imagekit.io/visualai/la-solid-900_4PLSO07Dyjx.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          {/* <link
            rel="preload"
            href="//ik.imagekit.io/linkpeimgcdn/https://api.mapbox.com/mapbox-gl-js/v2.1.0/mapbox-gl.css"
            as="style"
          /> */}

          <link href={mapbox_style_url} rel="stylesheet" />
          
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
            key="viewport"
          />

          <script src={olMap_script_url} defer />
          <script src={olMap_ext_script_url} defer />
          {/* Global site tag (gtag.js) - Google Analytics  */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');

            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTAG_ID}');
            `,
            }}
          ></script>
        </Head>
        <Offline polling={false}>
          <>
            <Head>
              <link
                rel="icon"
                type="image/ico"
                sizes="30x29"
                href={`${public_dir}images/favicon.ico`}
              />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
                key="viewport"
              />
              <title>No Internet</title>
            </Head>
            <NoInternetComponent />
          </>
        </Offline>
        <Online polling={false}>
          {/* {
            this.state.isLoading === true ? (
              <PageLoader />
            ) : (
              <Component {...pageProps} />
            )
          } */}
          {/* {get_item_cookie("authToken") && !get_item_cookie("sitetour") && (
            <Joyride
              steps={this.state.steps}
              styles={customStyleJoyride}
              callback={() => {
                set_item_cookie("sitetour", 1);
              }}
              run={this.state.run}
              continuous
              disableOverlayClose
              showSkipButton
              // hideCloseButton
              locale={{
                last: "Close",
              }}
              scrollToFirstStep
              disableCloseOnEsc
            />
          )} */}
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            // pauseOnFocusLoss
            draggable
            pauseOnHover
            hideProgressBar
            closeOnClick
          />
          <Component {...pageProps} />
        </Online>
        <img
          hidden
          alt="no-internet"
          src={`${public_dir}images/no-internet.png`}
        />
      </>
    );
  }
}

export default MyApp;