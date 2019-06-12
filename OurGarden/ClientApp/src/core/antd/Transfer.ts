import Transfer, { TransferItem as originTransferItem } from "antd/es/transfer";
import "antd/es/transfer/style/index.css";

import "./Checkbox";
import "./Button";
import "./Input";

interface TransferItem extends originTransferItem {}

export {
    TransferItem,
};

export default Transfer;
