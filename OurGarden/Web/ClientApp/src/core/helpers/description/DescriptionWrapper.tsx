import React from "react";

import Gallery from "@src/core/components/Gallery";

import { getFormattedDescription, getPartsBetween } from "./DescriptionHelper";
import { CATALOG_MACROS, GALLERY_MACROS } from "@src/core/constants";
import { WHITE_BLOCK } from "@src/core/constants/style";

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
  // Использовать стандартные классы обёртки, если частей рендера больше одной
  useWysiwygDefaultClassNames = true,
  // В случае каталога, компонент с продуктами
  children,
}: {
  description?: string;
  wrapperClassName?: string;
  innerPartsClassName?: string;
  useWysiwygDefaultClassNames?: boolean;
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

      const galleryMacrosMatchGroups = catalogPartString.match(GALLERY_MACROS)
        ?.groups;
      if (galleryMacrosMatchGroups && galleryMacrosMatchGroups.galleryName) {
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
        renderParts.push(
          <Gallery galleryName={galleryMacrosMatchGroups.galleryName} />
        );

        if (galleryParts.length > 1 && galleryParts[galleryParts.length - 1]) {
          // prettier-ignore
          const className
            = counterObj.part++ % 2 ? OPEN_PART_CLASS : CLOSE_PART_CLASS;
          renderParts.push(
            <div
              className={`${baseClassName} ${className}`}
              dangerouslySetInnerHTML={{
                __html: galleryParts[galleryParts.length - 1],
              }}
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
        // prettier-ignore
        renderParts.length > 1 && useWysiwygDefaultClassNames
          ? `${WHITE_BLOCK} ${
            WYSIWYG_PART_CLASS
          } pt18 pb5`
          : ""
      }`}
    >
      {React.Children.toArray(renderParts)}
    </div>
  );
};

export { WYSIWYG_PART_CLASS };

export default DescriptionWrapper;
