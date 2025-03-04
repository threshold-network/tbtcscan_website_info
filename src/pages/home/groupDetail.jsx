import React, {useState, useEffect} from "react";
import * as Data from "../data";
import styles from './styles.module.css'
import Link from "@mui/material/Link";
import * as Utils from "../../utils/utils";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from "@mui/lab/TabPanel";
import TabList from '@mui/lab/TabList';
import TabContext from "@mui/lab/TabContext";
import Loader from "../../components/loader";
import moment from "moment/moment";
import Tooltip from "@mui/material/Tooltip";
import {ReactComponent as Copy} from '../../assets/copy.svg';
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";


function GroupDetail({group}) {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab style={{textTransform: 'none', color: "black"}} label="Members" value="1"/>
                        {
                            !group?.isWalletRegistry ? (
                                <Tab style={{textTransform: 'none', color: "black"}} label="Entries" value="2"/>
                            ) : (
                                <></>
                            )
                        }
                    </TabList>
                </Box>
                <TabPanel value="1" className={styles.operator_detail}>{MembersGroup(group)}</TabPanel>
                {
                    !group?.isWalletRegistry ? (
                        <TabPanel value="2" className={styles.operator_detail}>{Entries(group)}</TabPanel>
                    ) : (
                        <></>
                    )
                }


            </TabContext>
        </Box>
    );
}

function MembersGroup(group) {
    return (<div>
        <Paper sx={{backgroundColor:"transparent", boxShadow:"0"}}>
            <TableContainer >
            <table className={styles.beacon_groups_table}>
                <thead>
                <tr>
                    <th>Address</th>
                    <th>Node Address</th>
                    <th>Weight</th>
                    <th>Seats</th>
                    <th>TBTC Authorized</th>
                    <th>Random Beacon Authorized</th>
                    <th>Available Reward</th>
                    <th>Faults</th>
                </tr>
                </thead>

                <tbody>
                {group?.memberships?.map(memberShip => {
                    const count = memberShip.count;
                    const seats = memberShip.seats;
                    const operator = memberShip.operator;
                    const id = operator.id;
                    const nodeAddress = operator.address;
                    const misbehavedCount = operator.misbehavedCount;
                    const tBTCAuthorizedAmount = operator.tBTCAuthorizedAmount;
                    const randomBeaconAuthorizedAmount = operator.randomBeaconAuthorizedAmount;
                    const availableReward = operator.availableReward;
                    return (
                        <tr>
                            <td><Link
                                target="_blank"
                                underline="hover"
                                href={Utils.getDomain() + "?operator=" + id}
                                className={styles.link}
                            >
                                {Data.formatString(id)}
                            </Link></td>
                            <td><Link
                                target="_blank"
                                underline="hover"
                                href={Utils.getEtherAddressLink() + nodeAddress}
                                className={styles.link}
                            >
                                {Data.formatString(nodeAddress)}
                            </Link></td>
                            <td>{count}</td>
                            <td style={{wordBreak: "break-word"}}>{seats.toString()}</td>
                            <td className={styles.numbers}>{Data.formatWeiDecimal(tBTCAuthorizedAmount)}</td>
                            <td className={styles.numbers}>{Data.formatWeiDecimal(randomBeaconAuthorizedAmount)}</td>
                            <td>{Data.formatWeiDecimal(availableReward)}</td>
                            <td>{misbehavedCount}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </TableContainer>
        </Paper>
        </div>
    );
}


function Entries(group) {
    return (<div>
            <table className={styles.beacon_groups_table}>
                <thead>
                <tr>
                    <th>Requested At</th>
                    <th>Submitted After</th>
                    <th>Entry Value</th>
                    <th>Request Id</th>
                </tr>
                </thead>

                <tbody>
                {group?.relayEntries?.map(entry => {
                    const id = entry.id;
                    const requestedAt = entry.requestedAt * 1000;
                    const submittedAt = entry.submittedAt * 1000;
                    const value = entry.value;
                    return (
                        <tr>
                            <td>{Data.formatTimeToText(requestedAt)}</td>
                            <td>{Data.formatEntryDate(moment.duration(
                                moment(submittedAt).diff(moment(requestedAt))
                            ))}</td>
                            <td>{value}</td>
                            <td>{Data.formatString(id)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}


const GroupDetailPage = () => {
    const [pageData, setPageData] = useState({
        rowData: {},
        isLoading: true,
    });
    const [groupPublicKey, setGroupPublicKey] = useState();
    const [currentBlock, setCurrentBlock] = useState();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const group = query.get("group");

        Data.getGroupDetail(group).then((info) => {
            setGroupPublicKey(info?.groupPublicKey?.pubKey);
            setPageData({
                isLoading: false,
                rowData: info,
            });
        });

        Data.getCurrentBlockNumber().then((info) => {
            setCurrentBlock(info);
        });


    }, []);

    const copyToClipBoard = (data) => {
        try {
            navigator.clipboard.writeText(data);
        } catch (err) {
        }
    }

    return (<>
            {
                pageData.isLoading ? (
                    <div style={{textAlign: "center"}}>
                        <Loader/>
                    </div>
                ) : (
                    <div>
                        <div className={styles.operator_detail_header}>
                            <div className={styles.operator_detail_header_address}>
                                <h3>{Data.formatString(groupPublicKey)}
                                    <Tooltip title="Copied">
                                        <Copy
                                            style={{cursor: "pointer"}}
                                            onClick={(e) => copyToClipBoard(groupPublicKey)}
                                        />
                                    </Tooltip>
                                </h3>
                                <span>group</span>
                            </div>
                            <div className={styles.operator_detail_header_value}>
                                <div className={styles.operator_detail_header_value_item}>
                                    <div className={styles.operator_detail_header_value_item_lable}>member size
                                    </div>
                                    <div>
                                        <div>{pageData.rowData?.size}</div>
                                    </div>
                                </div>
                                <div className={styles.operator_detail_header_value_item}>
                                    <div className={styles.operator_detail_header_value_item_lable}>unique member
                                    </div>
                                    <div>
                                        <div>{pageData.rowData?.uniqueMemberCount}</div>
                                    </div>
                                </div>
                                <div className={styles.operator_detail_header_value_item}>
                                    <div className={styles.operator_detail_header_value_item_lable}> misbehave</div>
                                    <div>
                                        <div>{pageData.rowData?.misbehavedCount}</div>
                                    </div>
                                </div>
                                <div className={styles.operator_detail_header_value_item}>
                                    <div className={styles.operator_detail_header_value_item_lable}> slashed</div>
                                    <div>
                                        <div><span
                                            style={{fontSize: "25px"}}>{"T "}</span>{Data.formatWeiDecimal(pageData.rowData?.totalSlashedAmount)}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.operator_detail_header_value_item}>
                                    <div className={styles.operator_detail_header_value_item_lable}>created at</div>
                                    <div>
                                        <div>{Data.formatTimeToText(pageData.rowData?.createdAt * 1000)}</div>
                                    </div>
                                </div>
                                <div className={styles.operator_detail_header_value_item}>
                                    <div className={styles.operator_detail_header_value_item_lable}>state</div>
                                    <div>
                                        <div>{Utils.getGroupState(pageData.rowData, currentBlock)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <GroupDetail group={pageData.rowData}/>
                    </div>
                )
            }</>

    );
}

export default GroupDetailPage;