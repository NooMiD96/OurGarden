import React from "react";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Adapter from "./Base64Adapter";

import "@ckeditor/ckeditor5-build-classic/build/translations/ru";

interface IProps {
  data: string;
}
interface IState {
  editor: any;
}
export class Component extends React.PureComponent<IProps, IState> {
  state: IState = {
    editor: {}
  };

  config = {
    language: "ru"
  };

  render() {
    const { data } = this.props;

    return (
      <div className="CKEditor">
        <h2>Содержимое</h2>
        <CKEditor
          editor={ClassicEditor}
          data={data}
          onInit={(api: any) => {
            this.setState({
              editor: api
            });
            api.plugins.get("FileRepository").createUploadAdapter = (
              loader: any
            ) => new Adapter(loader);
          }}
          config={this.config}
        />
      </div>
    );
  }
}

export default Component;
