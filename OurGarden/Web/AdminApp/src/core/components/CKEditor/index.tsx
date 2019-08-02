import React, { useState } from "react";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Component = () => {
  const [editor, setEditor] = useState(null as any);

  return (
    <div className="CKEditor">
      <h2>Содержимое</h2>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onInit={api => {
          setEditor(api);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
      />
    </div>
  );
};

export default Component;
