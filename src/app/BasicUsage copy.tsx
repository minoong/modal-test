"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function BasicUsage() {
  const router = useRouter();
  const stackRef = useRef<number[]>([0]);
  const [current, setCurrent] = useState(0);
  const prev = useRef(0);
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  });

  useEffect(() => {
    console.log(isOpen, stackRef.current);
    function test() {
      console.log(isOpen, stackRef.current);
      if (!(stackRef.current.length === 1 && stackRef.current[0] === 0)) {
        console.log("sdfjkalsjdkl");
        // 뒤로가기가 실행될 경우 추가 action 등록
        setCurrent(stackRef.current[stackRef.current.length - 2]);
        stackRef.current.pop();
      } else {
        onClose();
      }
    }
    if (isOpen) {
      console.log("prevent");
      // history.pushState(null, "", window.location.href); // 현재 페이지 history stack 한개 더 쌓기

      window.addEventListener("popstate", test);

      //   window.onpopstate = () => {
      //     console.log(isOpen, stackRef.current);
      //     if (!(stackRef.current.length === 1 && stackRef.current[0] === 0)) {
      //       // 뒤로가기가 실행될 경우 추가 action 등록
      //       setCurrent(stackRef.current[stackRef.current.length - 2]);
      //       stackRef.current.pop();
      //     } else {
      //       onClose();
      //     }
      //   };
    }

    return () => {
      console.log("clear");
      window.removeEventListener("popstate", test);
    };
  }, [isOpen]);

  //   useEffect(() => {
  //     console.log(321);
  //     history.pushState(null, "", window.location.href); // 현재 페이지 history stack 한개 더 쌓기
  //   }, []);

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalContent>
          <ModalHeader>
            Modal Title #{current} <p>스택 : {stackRef.current.join(",")}</p>
          </ModalHeader>
          <ModalBody p="0">
            <Button
              disabled
              onClick={() => {
                stackRef.current = [...stackRef.current, 0];
                setCurrent(1);
              }}
            >
              다음 #0
            </Button>
            <Button
              onClick={() => {
                stackRef.current = [...stackRef.current, 1];
                setCurrent(1);
              }}
            >
              다음 #1
            </Button>
            <Button
              onClick={() => {
                stackRef.current = [...stackRef.current, 2];
                setCurrent(2);
              }}
            >
              다음 #2
            </Button>
            <Button
              onClick={() => {
                stackRef.current = [...stackRef.current, 3];
                setCurrent(3);
              }}
            >
              다음 #3
            </Button>
            <Button onClick={onClose}>닫기</Button>
            <Tabs index={current} onChange={setCurrent}>
              <TabList hidden>
                <Tab>#1</Tab>
                <Tab>#2</Tab>
                <Tab>#3</Tab>
                <Tab>#4</Tab>
              </TabList>

              <TabPanels p="0">
                <TabPanel p="0">
                  <p>one!</p>
                </TabPanel>
                <TabPanel p="0">
                  <p>two!</p>
                </TabPanel>
                <TabPanel p="0">
                  <p>three!</p>
                </TabPanel>
                <TabPanel p="0">
                  <p>four!</p>
                  <Button
                    onClick={(e) => {
                      //   window.history.back();
                      router.push("/notice");
                    }}
                  >
                    공지사항
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
