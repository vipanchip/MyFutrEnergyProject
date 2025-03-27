import { public_dir } from "lib/constants";

export default function NoInternetComponent() {
    return (
        <>
            <div id="no-internet">
                <div className="web-logo">
                    <img src={`${public_dir}images/futr-energy-logo-large.png`} alt="Futr.Energy" height={50} width="auto" />
                </div>
                <div className="content-holder">
                    <img src={`${public_dir}images/no-internet.png`} alt="no internet" />
                    <h1>OOPS!</h1>
                    <h2>You've lost the Internet Connection</h2>
                    <p>Please check your internet connection and try again.</p>
                </div>
            </div>
            <style jsx>{`
        .web-logo {
            background: #eef1f3;
            padding: 1rem 0;
        }
        img {
            display: block;
            margin: 0 auto;
            max-width: 100%;
        }
        .content-holder {
            max-width: 380px;
            margin: 6rem auto 0;
            text-align: center
        }
        h1, h2 , p {
            margin: 0;
        }
        h1 {
            color: #5c6fff;
            font-size: 1.5rem;
            letter-spacing: 1px;
            margin-top: 2rem;
            margin-bottom: .5rem
        }
        h2 {
            font-size: 1.125rem;
        }
        p {
            font-size: .875rem;
            margin-top: .125rem
        }
        `}</style>
        </>
    )
}