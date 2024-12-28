import { Input as InputRNR } from "~/components/ui/input";

import { useState } from "react";

export default function Input({
  value,
  setValue,
  ...props
}: {
  value: number;
  setValue: (value: number) => void;
  [key: string]: any;
}) {
  const [value_disp, setValueDisp] = useState(String(value));

  function handleChangeValueDisp(v_disp: string) {
    // filter non-numeric characters
    v_disp = v_disp.replace(/[^\d.-]/g, "");
    setValueDisp(v_disp);
  }
  function handleChangeValue(v: number) {
    setValue(v);
    // update display value to match value
    setValueDisp(String(v));
  }

  return (
    <InputRNR
      value={value_disp}
      onChangeText={handleChangeValueDisp}
      onEndEditing={(e) => handleChangeValue(Number(e.nativeEvent.text))}
      {...props}
    />
  );
}
