import React, {useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { TabBox, ContentBox, TabTitle } from '../../styles/ProfileStyle';
import EmpInfo from "./EmpInfo";
import EmpPwd from "./EmpPwd";

function ProfileTab() {
  const [index, setIndex] = useState(0);

  return (
    <>
      <Tabs selectedIndex={index} onSelect={index => setIndex(index)}>
        <ContentBox>
          <TabBox>
            <TabList>
              <Tab>
                <TabTitle>개인정보</TabTitle>
              </Tab>
              <Tab>
                <TabTitle>비밀번호 변경</TabTitle>
              </Tab>
            </TabList>
          </TabBox>

          {/* 1번 탭 : 개인정보 조회 */}
          <TabPanel>
            <EmpInfo />
          </TabPanel>

          {/* 2번 탭 : 비밀번호 변경 */}
          <TabPanel>
            <EmpPwd />
          </TabPanel>
        </ContentBox>
      </Tabs>
    </>
  );
}

export default ProfileTab;