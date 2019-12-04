import React from "react";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { confirm, IConfirmReturn } from "@core/antd/Modal";
import Input from "@core/antd/Input";

import "@ckeditor/ckeditor5-build-classic/build/translations/ru";

interface IProps {
  data: string;
}
interface IState {
  editor: any;
}
export class CKEditorWrapper extends React.PureComponent<IProps, IState> {
  state: IState = {
    editor: {}
  };

  config = {
    language: "ru"
  };

  onImageUploadSuccess = (
    inputRef: React.RefObject<Input>,
    modal: IConfirmReturn
  ) => {
    const { editor } = this.state;

    if (inputRef.current) {
      editor.model.change((writer: any) => {
        const imageElement = writer.createElement("image", {
          src: inputRef.current?.input.value
        });

        // Insert the image in the current selection location.
        editor.model.insertContent(
          imageElement,
          editor.model.document.selection
        );
      });
    }

    modal.destroy();
  };

  onImageUploadExecute = () => {
    const inputRef = React.createRef<Input>();

    const modal = confirm({
      title: null,
      icon: null,
      content: (
        <Input
          ref={inputRef}
          placeholder="Введите ссылку на фотографию"
          onPressEnter={() => this.onImageUploadSuccess(inputRef, modal)}
        />
      ),
      onOk: () => this.onImageUploadSuccess(inputRef, modal)
    });
  };

  editorInitHandler = (api: any) => {
    this.setState({
      editor: api
    });

    const { componentFactory, view } = api.ui;

    // Изображения в base64
    // api.plugins.get("FileRepository").createUploadAdapter = (
    //   loader: any
    // ) => new Adapter(loader);

    const imageViewFactory = componentFactory._components
      .get("imageupload")
      .callback();
    imageViewFactory.buttonView.off("execute");
    imageViewFactory.buttonView.on("execute", this.onImageUploadExecute);

    const imageViewButon = view.toolbar.items.find(
      (x: any) => x.acceptedType && x._fileInputView
    );
    imageViewButon.buttonView.off("execute");
    imageViewButon.buttonView.on("execute", this.onImageUploadExecute);
  };

  render() {
    const { data } = this.props;

    return (
      <div className="CKEditor">
        <h2>Содержимое</h2>
        <CKEditor
          editor={ClassicEditor}
          data={data}
          onInit={this.editorInitHandler}
          config={this.config}
        />
      </div>
    );
  }
}

export default CKEditorWrapper;
