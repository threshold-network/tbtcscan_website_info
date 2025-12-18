import React from "react";
import styles from "./styles.module.css";
import * as Const from "../../utils/Cons";

const About = () => {
    return (
        <div className={styles.about_content}>
            <h3>The Standard for Bitcoin Finance</h3>
            <p>Threshold Network powers tBTC, the Bitcoin standard in finance, and the most decentralized 1:1 tokenized BTC, enabling Bitcoin liquidity to move seamlessly across chains without compromising finality.</p>

            <p>Backed by threshold cryptography and independent node operators, tBTC embodies Bitcoin’s core values: trust-minimized, permissionless, and censorship-resistant, while maintaining direct settlement to native BTC. With $700M+ TVL and $4.2B+ bridge volume, tBTC powers lending, trading, and yield across major DeFi networks.</p>
            <div className={styles.div_bottom}>
                <a target="_blank" href={"https://github.com/threshold-network/tbtc-subgraph"}>[Subgraph code] - </a>
                <a target="_blank" href={"https://github.com/threshold-network/tbtcscan_website_info"}>[Website code] </a>
                API (Mainnet : <code>{Const.MAINNET_API}</code> -
                Testnet : <code>{Const.TESTNET_API}</code>)
            </div>
        </div>

    )
};

export default About;
