import React, {useState, useEffect} from "react";
import * as Data from "../data";
import styles from './styles.module.css'
import WalletTable from "../../components/table/wallet";

const WalletsPage = ({network}) => {
    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        pageNumber: 1,
        totalBitcoinBalance: 0,
    });

    useEffect(() => {
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
            totalBitcoinBalance: 0
        }));

        Data.getProofOfFunds().then(({wallets, totalBitcoinBalance}) => {
            if (totalBitcoinBalance !== undefined && wallets?.length > 0) {
                wallets.sort((a, b) => b.walletBitcoinBalance - a.walletBitcoinBalance);
                setPageData({
                    isLoading: false,
                    rowData: wallets,
                    totalBitcoinBalance: totalBitcoinBalance
                });
            } else {
                setPageData({
                    isLoading: false,
                    rowData: [],
                    totalBitcoinBalance: 0
                });
            }
        });

    }, []);


    return (
        <div>
            <div>
                <div className={styles.operator_detail_header}>
                    <div className={styles.operator_detail_header_address}>
                        <h3>Wallets</h3>
                        <span>Proof of funds</span>
                    </div>
                    <div className={styles.operator_detail_header_value}>
                        <div className={styles.operator_detail_header_value_item}>
                            <div className={styles.operator_detail_header_value_item_lable}>
                                total BTC balance
                            </div>
                            <div>
                                <div>{pageData.totalBitcoinBalance}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.table_content}>
                <WalletTable
                    columns={Data.wallets_columns}
                    data={pageData.rowData}
                    isLoading={pageData.isLoading}
                />
            </div>
        </div>
    );
}

export default WalletsPage;