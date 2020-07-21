import React from "react";

import { getFormattedDescription, getPartsBetween } from "./DescriptionHelper";
import {
  CATALOG_MACROS,
  GALLERY_MACROS,
  WHITE_BLOCK,
} from "@src/core/constants";

const PART_CLASS = "ant-typography";
const WYSIWYG_PART_CLASS = "wysiwyg-wrapper wysiwyg-description";
const OPEN_PART_CLASS = "pt0 pb0";
const CLOSE_PART_CLASS = "pt0 pb0 mtn16";

/**
 * Формирует Html шаблон с реакт компоненты, с учётом макросов.
 */
const DescriptionWrapper = ({
  // Инъекцируемый Html код
  description,
  // Имя класса обертки
  wrapperClassName = "",
  // Имя класса для внутренних элементов
  innerPartsClassName = "",
  // В случае каталога, компонент с продуктами
  children,
}: {
  description?: string;
  wrapperClassName?: string;
  innerPartsClassName?: string;
  children?: React.ReactNode;
}) => {
  // Части для рендера. Если таких несколько,
  // то враппер будет обязательно в белом блоке.
  const renderParts: React.ReactNode[] = [];

  const formattedDescription = getFormattedDescription(description);
  let catalogParts: React.ReactNode[] = getPartsBetween(
    formattedDescription,
    CATALOG_MACROS
  );

  catalogParts = [catalogParts[0], children, catalogParts[1]].filter(Boolean);

  const baseClassName = `${PART_CLASS} ${innerPartsClassName}`;

  const counterObj = {
    part: 1,
  };
  for (const catalogPart of catalogParts) {
    if ((catalogPart as any).$$typeof) {
      renderParts.push(catalogPart);
    } else {
      const catalogPartString = catalogPart as string;

      if (GALLERY_MACROS.test(catalogPartString)) {
        const galleryParts = getPartsBetween(catalogPartString, GALLERY_MACROS);

        if (galleryParts[0]) {
          // prettier-ignore
          const className
            = counterObj.part++ % 2 ? OPEN_PART_CLASS : CLOSE_PART_CLASS;
          renderParts.push(
            <div
              className={`${baseClassName} ${className}`}
              dangerouslySetInnerHTML={{ __html: galleryParts[0] }}
            />
          );
        }

        // Gallery
        // renderParts.push(
        //   <span>HELLOW</span>
        // );

        if (galleryParts[1]) {
          // prettier-ignore
          const className
            = counterObj.part++ % 2 ? OPEN_PART_CLASS : CLOSE_PART_CLASS;
          renderParts.push(
            <div
              className={`${baseClassName} ${className}`}
              dangerouslySetInnerHTML={{ __html: galleryParts[1] }}
            />
          );
        }
      } else if (counterObj.part++ % 2) {
        renderParts.push(
          <div
            className={`${baseClassName} ${OPEN_PART_CLASS}`}
            dangerouslySetInnerHTML={{ __html: catalogPartString }}
          />
        );
      } else {
        renderParts.push(
          <div
            className={`${baseClassName} ${CLOSE_PART_CLASS}`}
            dangerouslySetInnerHTML={{ __html: catalogPartString }}
          />
        );
      }
    }
  }

  return (
    <div
      className={`${wrapperClassName} ${
        renderParts.length > 1
          ? `${WHITE_BLOCK} ${WYSIWYG_PART_CLASS} pt18 pb5`
          : ""
      }`}
    >
      {React.Children.toArray(renderParts)}
    </div>
  );
};

export { WYSIWYG_PART_CLASS };

export default DescriptionWrapper;
