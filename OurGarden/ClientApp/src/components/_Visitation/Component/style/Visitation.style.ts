import styled from "styled-components";

export default styled.div`
    .ant-transfer {
        margin-top: 10px;
    }
    .save-button {
        margin-right: 15px;
    }

    .ant-transfer-operation .ant-btn{
        width: 100%;

        span {
            width: calc(100% - 20px);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow-x: hidden;
        }

        i.anticon {
            vertical-align: 0.2em;
        }
    }
`;
