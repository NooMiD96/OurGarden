import styled from "styled-components";

export default styled.div`
.ant-upload {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: 'tnum';
          font-feature-settings: 'tnum';
  outline: 0;  
  width: -webkit-fill-available;
}
.ant-upload p {
  margin: 0;
}
.ant-upload-btn {
  display: block;
  width: 100%;
  outline: none;
}
.ant-upload input[type='file'] {
  cursor: pointer;
}
.ant-upload.ant-upload-select {
  display: inline-block;
}
.ant-upload.ant-upload-disabled {
  cursor: not-allowed;
}
.ant-upload.ant-upload-select-picture-card {
  display: table;
  height: 164px;
  margin-right: 8px;
  margin-bottom: 8px;
  text-align: center;
  vertical-align: top;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  -webkit-transition: border-color 0.3s ease;
  transition: border-color 0.3s ease;
}
.ant-upload.ant-upload-select-picture-card > .ant-upload {
  display: table-cell;
  width: 100%;
  height: 100%;
  padding: 8px;
  text-align: center;
  vertical-align: middle;
}
.ant-upload.ant-upload-select-picture-card:hover {
  border-color: #1890ff;
}
`;
