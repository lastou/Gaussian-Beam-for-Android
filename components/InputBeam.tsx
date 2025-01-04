import Table from "./custom-ui/table";

import Input from "~/components/custom-ui/input";
import Text from "~/components/custom-ui/text";

import { RayleighRange } from "~/lib/calculate";
import { Beam } from "~/lib/types";

import { View } from "react-native";

export default function InputBeam({
  input_beam,
  setInputBeam,
  wavelength,
  setWavelength,
}: {
  input_beam: Beam;
  setInputBeam: (beam: Beam) => void;
  wavelength: number;
  setWavelength: (value: number) => void;
}) {
  const columns = [
    {
      key: "wavelength",
      label: <Text className="font-bold">Wavelength (nm)</Text>,
      width: "24%",
    },
    {
      key: "waist",
      label: <Text className="font-bold">Waist (um)</Text>,
      width: "24%",
    },
    {
      key: "position",
      label: <Text className="font-bold">Waist Position (mm)</Text>,
      width: "25%",
    },
    {
      key: "rayleigh_range",
      label: <Text className="font-bold">Rayleigh Range (mm)</Text>,
      width: "27%",
    },
  ];
  const items = [
    {
      key: "input_beam",
      optics: "Input beam",
      wavelength: <Input value={wavelength} setValue={setWavelength} />,
      waist: (
        <Input
          value={input_beam.waist}
          setValue={(value) => {
            setInputBeam({ ...input_beam, waist: Number(value) });
          }}
        />
      ),
      position: (
        <Input value={input_beam.position} setValue={handleChangePosition} />
      ),

      rayleigh_range: (
        <Text>{RayleighRange(input_beam.waist, wavelength).toFixed(3)}</Text>
      ),
    },
  ];

  function handleChangePosition(value: number) {
    setInputBeam({
      ...input_beam,
      position: value,
    });
  }

  return (
    <View className="border rounded-xl border-slate-200">
      <Table
        columns={columns}
        items={items}
        aria-labelledby="input-beam"
        className="h-[8.5rem]"
      />
    </View>
  );
}
