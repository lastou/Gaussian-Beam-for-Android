import Table from "./custom-ui/table";

import Input from "~/components/custom-ui/input";
import Text from "~/components/custom-ui/text";

import { RayleighRange } from "~/lib/calculate";
import { Beam } from "~/lib/types";

import { ScrollView } from "react-native";

export default function Probe({
  probe_position,
  setProbePosition,
  probe_beam,
  wavelength,
}: {
  probe_position: number;
  setProbePosition: (value: number) => void;
  probe_beam: Beam;
  wavelength: number;
}) {
  const columns = [
    {
      key: "position",
      label: <Text className="font-bold">Position (mm)</Text>,
    },
    {
      key: "beam_radius",
      label: <Text className="font-bold">Beam Radius (um)</Text>,
    },
    {
      key: "beam_curvature",
      label: <Text className="font-bold">Beam Curvature (mm)</Text>,
    },
    {
      key: "waist",
      label: <Text className="font-bold">Waist (um)</Text>,
    },
    {
      key: "waist_position",
      label: <Text className="font-bold">Waist Position (mm)</Text>,
    },
    {
      key: "rayleigh_range",
      label: <Text className="font-bold">Rayleigh Range (mm)</Text>,
    },
  ];

  const rayleigh_range = RayleighRange(probe_beam.waist, wavelength);
  const z = probe_position - probe_beam.position;
  const items = [
    {
      key: "probe",
      position: (
        <Input
          className="max-w-20 justify-self-center"
          value={probe_position}
          setValue={setProbePosition}
        />
      ),
      beam_radius: (
        <Text>
          {(
            probe_beam.waist * Math.sqrt(1 + (z / rayleigh_range) ** 2)
          ).toFixed(3)}
        </Text>
      ),
      beam_curvature: (
        <Text>{(z * (1 + (rayleigh_range / z) ** 2)).toFixed(3)}</Text>
      ),
      waist: <Text>{probe_beam.waist.toFixed(3)}</Text>,
      waist_position: <Text>{probe_beam.position.toFixed(3)}</Text>,
      rayleigh_range: <Text>{rayleigh_range.toFixed(3)}</Text>,
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="border rounded-xl border-slate-200"
    >
      <Table
        columns={columns}
        items={items}
        aria-labelledby="probe"
        className="h-[120px]"
      />
    </ScrollView>
  );
}
