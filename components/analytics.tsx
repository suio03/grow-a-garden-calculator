import Script from 'next/script'

const Analytics = () => (
    <>
        {/* google analytics */}
        {/* <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-Y0RLKVCNWW"
        />


        <Script
            id="google-analytics"
            dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-Y0RLKVCNWW');
                `,
            }}
        />
        <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "rplbn184cz");
        `
            }}
        /> */}
        <Script
            defer
            data-domain="gagcalculator.cc"
            src="https://actone.app/js/script.js"
        />

    </>
)

export default Analytics
