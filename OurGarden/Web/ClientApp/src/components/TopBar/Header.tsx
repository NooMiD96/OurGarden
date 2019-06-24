import * as React from "react";

import { Row, Col, Input } from "@src/core/antd";
import CustomIcon from "@core/antd/Icon";
import { Text } from "@src/core/antd/Typography";

import archiveJson from "@src/assets/svg/archive/archive.json";
import lottie, { AnimationItem } from "lottie-web";

// eslint-disable-next-line react/prefer-stateless-function
export class Header extends React.Component<{}, {}> {
  cart: React.RefObject<HTMLDivElement> = React.createRef();
  cartAnimation: AnimationItem | null = null;

  componentDidMount() {
    if (this.cart.current) {
      this.cartAnimation = lottie.loadAnimation({
        container: this.cart.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: archiveJson
      });
    }
  }
  onMouseEnter = () => {
    if (this.cartAnimation) {
      this.cartAnimation.setDirection(1)
      this.cartAnimation.play();
    }
  }
  onMouseLeave = () => {
    if (this.cartAnimation) {
      this.cartAnimation.setDirection(-1)
      this.cartAnimation.play();
    }
  }

  render() {
    return (
      <Row type="flex" className="header-wrapper">
        <Col>
          <Input
            placeholder="Enter your username"
            prefix={<CustomIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <Text>
            <CustomIcon type="arrow-right" />
            ул. 9 мая, 96
            <CustomIcon type="caret-dow" />
            8 800 520 55 66
            <div
              ref={this.cart}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
            />
            <CustomIcon type="check" />
          </Text>
        </Col>
      </Row>
    );
  }
}

export default Header;
