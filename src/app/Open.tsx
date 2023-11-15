"use client";

import BasicUsage from "@/app/BasicUsage";
import { ModalType, idsAtom, todoAtomFamily } from "@/modalAtom";
import { Button } from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { useState } from "react";

function Open() {
  const [meta, setMeta] = useAtom(idsAtom);
  return (
    <>
      <Button
        onClick={() => {
          todoAtomFamily({ id: "1" });
          setMeta((prev) => [...prev, "1"]);
        }}
      >
        다음 #1
      </Button>
      <Button
        onClick={() => {
          todoAtomFamily({ id: "2" });
          setMeta((prev) => [...prev, "2"]);
        }}
      >
        다음 #2
      </Button>
      {meta?.length && meta.map((v) => <BasicUsage key={v} id={v} />)}
    </>
  );
}

export default Open;
