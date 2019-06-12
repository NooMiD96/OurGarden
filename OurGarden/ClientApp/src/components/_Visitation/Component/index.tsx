import * as React from "react";

import Alert from "@src/core/components/Alert";
import { Spin, Button, Row, Col, Select } from "@core/antd";
import Transfer from "@core/antd/Transfer";
import { LocaleDatePicker } from "@core/antd/DatePicker";
import * as moment from "moment";
import "moment/locale/ru";

import { TState, TComponentState } from "@components/Visitation/TVisitation";
import { IVisitation } from "@components/Visitation/State";
import VisitationWrapper from "./style/Visitation.style";
import { Text } from "@src/core/antd/Typography";

export class Visitation extends React.PureComponent<TState, TComponentState> {
  state: TComponentState = {
    date: moment(),
  };

  componentDidMount() {
    this.props.getVisitationList();
  }

  changeVisitationDate = (date: moment.Moment) => {
    this.setState({
      date,
    }, () => this.props.getVisitationList(this.state.date.format("YYYY-MM-DD")));
  }

  saveVisitation = () => {
    const newVisitationList: IVisitation[] = [];
    const { selectedGroup } = this.props;
    const { date } = this.state;

    if (selectedGroup === 0) {
      const { visitationList, targetVisitationKeys, targetDiseasedKeys } = this.props;

      visitationList.forEach(x => {
        let visitation: IVisitation = {
          visitationId: 0,
          childrenId: x.childrenId,
          date,
          visited: false,
          diseased: false,
          children: {} as any,
        };

        if (targetVisitationKeys.includes(x.childrenId.toString())) {
          visitation.visited = true;
        } else if (targetDiseasedKeys.includes(x.childrenId.toString())) {
          visitation.diseased = true;
        }
        newVisitationList.push(visitation);
      });
    } else {
      const { transferData, visitationList, targetVisitationKeys, targetDiseasedKeys } = this.props;

      transferData.forEach(x => {
        let visitation: IVisitation = {
          visitationId: 0,
          childrenId: +x.key,
          date,
          visited: false,
          diseased: false,
          children: {} as any,
        };

        if (targetVisitationKeys.includes(x.key)) {
          visitation.visited = true;
        } else if (targetDiseasedKeys.includes(x.key)) {
          visitation.diseased = true;
        }
        newVisitationList.push(visitation);
      });
    }

    this.props.saveVisitationList(newVisitationList);
  }

  getSelectContent = () => {
    const { visitationList } = this.props;
    const selectContent = [{key: 0, label: "Все группы"}];
    const existGroup: any = {};

    visitationList.forEach(x => {
      if (!existGroup[x.children.group.groupId]) {
        existGroup[x.children.group.groupId] = true;

        selectContent.push({
          key: x.children.group.groupId,
          label: x.children.group.groupName,
        });
      }
    });

    return selectContent;
  }

  changeGroup = (value: number) => {
    this.props.changeGroup(value);
  }

  handleKeyChange = (targetKeys: string[]) => {
    this.props.changeTargetList(targetKeys);
  }

  handleDiseasedKeyChange = (targetKeys: string[]) => {
    this.props.changeDiseasedTargetList(targetKeys);
  }

  render() {
    const {
      errorInner,
      cleanErrorInner,
      pending,
      transferVisitationData,
      targetVisitationKeys,
      transferDiseasedData,
      targetDiseasedKeys,
      selectedGroup,
    } = this.props;
    const { date } = this.state;

    const selectContent = this.getSelectContent();

    return (
      <VisitationWrapper>
        {
          errorInner && <Alert
            message="Ошибка"
            description={errorInner}
            type="error"
            closable
            style={{ marginBottom: 10 }}
            onClose={cleanErrorInner}
          />
        }
        <Spin
          spinning={pending}
        >
          <Row>
            <Col xs={24} sm={24}>
              <Button
                onClick={this.saveVisitation}
                type="primary"
                className="save-button"
              >
                Сохранить
              </Button>

              <LocaleDatePicker
                defaultValue={date}
                onChange={this.changeVisitationDate}
                allowClear={false}
              />

              <Select
                // defaultValue={0}
                value={selectedGroup}
                onSelect={this.changeGroup}
              >
                {selectContent.map(x =>
                  <Select.Option key={x.key} value={x.key}>
                    {x.label}
                  </Select.Option>
                )}
              </Select>
            </Col>

            <Col xs={24} sm={24} xxl={12}>
              <Transfer
                dataSource={transferVisitationData}
                targetKeys={targetVisitationKeys}
                render={item => item.title}
                onChange={this.handleKeyChange}
                listStyle={{
                  width: "40%",
                  height: 500,
                }}
                operationStyle={{
                  maxWidth: "15%",
                }}
                showSearch
                titles={["Отсутствовали", "Присутствовали"]}
                operations={["Присутствовали", "Отсутствовали"]}
                locale={{
                  itemUnit: "",
                  itemsUnit: "",
                  searchPlaceholder: "Поиск",
                }}
              />
            </Col>

            <Col xs={24} sm={24} xxl={12}>
              <Transfer
                dataSource={transferDiseasedData}
                targetKeys={targetDiseasedKeys}
                render={item => item.title}
                onChange={this.handleDiseasedKeyChange}
                showSearch
                listStyle={{
                  width: "40%",
                  height: 500,
                }}
                operationStyle={{
                  maxWidth: "15%",
                }}
                titles={["Отсутствовали", "Болели"]}
                operations={["Болели", "Отсутствовали"]}
                locale={{
                  itemUnit: "",
                  itemsUnit: "",
                  searchPlaceholder: "Поиск",
                }}
              />

            </Col>
          </Row>
        </Spin>
      </VisitationWrapper>
    );
  }
}
