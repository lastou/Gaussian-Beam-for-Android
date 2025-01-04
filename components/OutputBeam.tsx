import Table from "./custom-ui/table";

import Text from "~/components/custom-ui/text";

import { RayleighRange } from "~/lib/calculate";
import { Beam } from "~/lib/types";

import { View } from "react-native";

export default function OutputBeam({
  output_beam,
  wavelength,
  position_last_lens,
}: {
  output_beam: Beam;
  wavelength: number;
  position_last_lens: number;
}) {
  const columns = [
    {
      key: "waist",
      label: <Text className="font-bold">Waist (um)</Text>,
      width: "22%",
    },
    {
      key: "position",
      label: <Text className="font-bold">Waist Position (mm)</Text>,
      width: "25%",
    },
    {
      key: "relative_position",
      label: <Text className="font-bold">Relative Position (mm)</Text>,
      width: "27%",
    },

    {
      key: "rayleigh_range",
      label: <Text className="font-bold">Rayleigh Range (mm)</Text>,
      width: "26%",
    },
  ];

  const items = [
    {
      key: "output_beam",
      waist: <Text>{output_beam.waist.toFixed(3)}</Text>,
      position: <Text>{output_beam.position.toFixed(3)}</Text>,
      relative_position: (
        <Text>{(output_beam.position - position_last_lens).toFixed(3)}</Text>
      ),
      rayleigh_range: (
        <Text>{RayleighRange(output_beam.waist, wavelength).toFixed(3)}</Text>
      ),
    },
  ];
  return (
    <View className="border rounded-xl border-slate-200">
      <Table
        columns={columns}
        items={items}
        aria-labelledby="output-beam"
        rowHeight={56}
        className="h-32"
      />
    </View>
  );
}
