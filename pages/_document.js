import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html >
            <Head>
                <meta name="description" content="Created by Daniel Slaver Mbengui" />
                <link rel="icon" href="/favicon.ico" />
                <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" />

                <script defer src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
                <script defer src="https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"></script>
                <script defer src="/config.firebase.js"></script>

                <meta name="application-name" content="Dandela Web App" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Dandela Web App" />
                <meta name="description" content="Dandela Web App, the link between you and your family" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-config" content="/icons/browserconfig.xml" />
                <meta name="msapplication-TileColor" content="#2B5797" />
                <meta name="msapplication-tap-highlight" content="no" />
                

                <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
                <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

                <link rel="icon" type="image/ico" sizes="32x32" href="/favicon32x32.ico" />
                <link rel="icon" type="image/ico" sizes="16x16" href="/favicon16x16.ico" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#094397" />
                <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
                <link rel="shortcut icon" href="/favicon32x32.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content="https://webapp.dandela.com" />
                <meta name="twitter:title" content="Dandela Web App, the link between you and your family" />
                <meta name="twitter:description" content="Dandela Web App, the link between you and your family" />
                <meta name="twitter:image" content="https://webapp.dandela.com/img/logo.png" />
                <meta name="twitter:creator" content="@DrillDev" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Dandela Web App" />
                <meta property="og:description" content="Dandela Web App, the link between you and your family" />
                <meta property="og:site_name" content="Dandela Web App" />
                <meta property="og:url" content="https://webapp.dandela.com" />
                <meta property="og:image" content="https://webapp.dandela.com/img/logo.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}