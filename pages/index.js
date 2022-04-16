import { useState } from "react";
import useSizeContext from "../hooks/useSizeContext"

export default function Home() {
  const { isMobile } = useSizeContext();
  const [size, setSize] = useState(7);
  return (
    <>
    </>
  )
}
