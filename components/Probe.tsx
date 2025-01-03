import Table from "./custom-ui/table";

import Input from "~/components/custom-ui/input";
import Text from "~/components/custom-ui/text";

import { RayleighRange } from "~/lib/calculate";
import { Beam } from "~/lib/types";

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
      width: 80,
    },
    {
      key: "beam_radius",
      label: <Text className="font-bold">Beam Radius (um)</Text>,
      width: 84,
    },
    {
      key: "beam_curvature",
      label: <Text className="font-bold">Beam Curvature (mm)</Text>,
      width: 90,
    },
    {
      key: "waist_position",
      label: <Text className="font-bold">Waist Position (mm)</Text>,
      width: 84,
    },
    {
      key: "waist",
      label: <Text className="font-bold">Waist (um)</Text>,
      width: 76,
    },
    {
      key: "rayleigh_range",
      label: <Text className="font-bold">Rayleigh Range (mm)</Text>,
      width: 90,
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
      waist_position: <Text>{probe_beam.position.toFixed(3)}</Text>,
      waist: <Text>{probe_beam.waist.toFixed(3)}</Text>,
      rayleigh_range: <Text>{rayleigh_range.toFixed(3)}</Text>,
    },
  ];

  return (
    <Table
      columns={columns}
      items={items}
      aria-labelledby="probe"
      className="h-[8.5rem]"
    />
  );
}
