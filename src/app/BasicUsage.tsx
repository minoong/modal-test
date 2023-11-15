"use client";

import {
  ModalType,
  idsAtom,
  modalAtom,
  modalHistoryAtom,
  modalIndexAtom,
  todoAtomFamily,
} from "@/modalAtom";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useAtom, useSetAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useEffect, useRef } from "react";

interface Props extends Pick<ModalType, "id"> {}

function BasicUsage(props: Props) {
  const router = useRouter();
  const [meta, setMeta] = useAtom(idsAtom);
  const [item, setItem] = useAtom(todoAtomFamily({ id: props.id }));
  const stackRef = useRef<number[]>(item.history || [0]);
  const prev2 = useRef(false);

  useEffect(() => {
    function test() {
      if (prev2.current) return;
      if (!(stackRef.current.length === 1 && stackRef.current[0] === 0)) {
        setItem((prev) => {
          return {
            ...prev,
            index: stackRef.current[stackRef.current.length - 2],
            history: stackRef.current,
            open: true,
          };
        });

        stackRef.current.pop();
      } else {
        setItem((prev) => {
          return {
            ...prev,
            open: false,
          };
        });
        todoAtomFamily.remove({ id: props.id });
        setMeta((prev) => prev.filter((v) => v !== props.id));
      }
    }
    if (item.open) {
      window.addEventListener("popstate", test);
    }

    return () => {
      window.removeEventListener("popstate", test);
    };
  }, [item.open]);

  useEffect(() => {
    setItem((prev) => ({ ...prev, open: true }));
    router.push("/?test=0");
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setItem((prev) => ({ ...prev, open: true }));
          router.push("/?test=0");
        }}
      >
        Open Modal
      </Button>

      <Modal isOpen={item.open} onClose={() => {}} size={"full"}>
        <ModalContent>
          <ModalHeader>
            {props.id} Modal Title #{item.index}{" "}
            <p>스택 : {stackRef.current.join(",")}</p>
          </ModalHeader>
          <ModalBody p="0">
            <Button
              disabled
              onClick={() => {
                stackRef.current = [...stackRef.current, 0];

                setItem((prev) => ({
                  ...prev,
                  history: stackRef.current,
                  index: 0,
                }));

                router.push("/?test=0");
              }}
            >
              다음 #0
            </Button>
            <Button
              onClick={() => {
                stackRef.current = [...stackRef.current, 1];
                setItem((prev) => ({
                  ...prev,
                  history: stackRef.current,
                  index: 1,
                }));
                router.push("/?test=1");
              }}
            >
              다음 #1
            </Button>
            <Button
              onClick={() => {
                stackRef.current = [...stackRef.current, 2];
                setItem((prev) => ({
                  ...prev,
                  history: stackRef.current,
                  index: 2,
                }));
                router.push("/?test=2");
              }}
            >
              다음 #2
            </Button>
            <Button
              onClick={() => {
                stackRef.current = [...stackRef.current, 3];
                setItem((prev) => ({
                  ...prev,
                  history: stackRef.current,
                  index: 3,
                }));
                router.push("/?test=3");
              }}
            >
              다음 #3
            </Button>
            <Button
              onClick={() => setItem((prev) => ({ ...prev, open: false }))}
            >
              닫기
            </Button>
            <Tabs
              index={item.index}
              onChange={(v) => setItem((prev) => ({ ...prev, index: v }))}
            >
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
                  <Link href="/notice">공지사항링크</Link>
                  <Button
                    onClick={(e) => {
                      //   window.history.back();
                      router.push("/notice");
                    }}
                  >
                    공지사항
                  </Button>
                  <Button
                    onClick={() => {
                      todoAtomFamily({ id: "2" });
                      setMeta((prev) => [...prev, "2"]);
                      prev2.current = true;
                    }}
                  >
                    다음 #1
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setItem((prev) => ({ ...prev, open: false }))}
            >
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BasicUsage;
