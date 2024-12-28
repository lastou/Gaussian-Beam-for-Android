import Input from "~/components/custom-ui/input";

import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Text } from "~/components/ui/text";

import { RayleighRange } from "~/lib/calculate";
import { Beam } from "~/lib/types";

import { useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FlashList } from "@shopify/flash-list";

const MIN_COLUMN_WIDTHS = [120, 120, 100, 120];

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
  const [display_position, setDisplayPosition] = useState(
    String(probe_position),
  );

  function handleChangePosition(value: number) {
    setProbePosition(value);
    setDisplayPosition(String(value));
  }

  const columns = [
    {
      key: "optics",
      label: "Optics",
    },
    {
      key: "position",
      label: "Position(mm)",
    },
    {
      key: "beam_radius",
      label: "Beam radius(um)",
    },
    {
      key: "beam_curvature",
      label: "Beam curvature(mm)",
    },
    {
      key: "waist_position",
      label: "Waist position(mm)",
    },
    {
      key: "waist",
      label: "Waist(um)",
    },
    {
      key: "rayleigh_range",
      label: "Rayleigh range(mm)",
    },
  ];
  const insets = useSafeAreaInsets();

  const rayleigh_range = RayleighRange(probe_beam.waist, wavelength);
  const z = probe_position - probe_beam.position;
  const items = [
    {
      key: "probe",
      optics: "Probe",
      position: (
        <Input
          className="max-w-20 justify-self-center"
          value={probe_position}
          setValue={setProbePosition}
        />
      ),
      beam_radius: (
        probe_beam.waist * Math.sqrt(1 + (z / rayleigh_range) ** 2)
      ).toFixed(3),
      beam_curvature: (z * (1 + (rayleigh_range / z) ** 2)).toFixed(3),
      waist_position: probe_beam.position.toFixed(3),
      waist: probe_beam.waist.toFixed(3),
      rayleigh_range: rayleigh_range.toFixed(3),
    },
  ];

  return (
    <>
      <Badge className="w-32 bg-[#FF7A3D]">
        <Text>Probe</Text>
      </Badge>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Table aria-labelledby="input-beam" style={{ height: 150 }}>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[1] }}>
                <Text>Position(mm)</Text>
              </TableHead>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[2] }}>
                <Text>Beam radius(um)</Text>
              </TableHead>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[3] }}>
                <Text>Beam curvature(mm)</Text>
              </TableHead>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[3] }}>
                <Text>Waist position(mm)</Text>
              </TableHead>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[3] }}>
                <Text>Waist(um)</Text>
              </TableHead>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[3] }}>
                <Text>Rayleigh range(mm)</Text>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <FlashList
              data={items}
              estimatedItemSize={75}
              contentContainerStyle={{
                paddingBottom: insets.bottom,
              }}
              renderItem={({ item }) => {
                return (
                  <TableRow key={item.key}>
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[1] }}>
                      {item.position}
                    </TableCell>
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[1] }}>
                      <Text>{item.beam_radius}</Text>
                    </TableCell>
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[1] }}>
                      <Text>{item.beam_curvature}</Text>
                    </TableCell>
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[2] }}>
                      <Text>{item.waist_position}</Text>
                    </TableCell>
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[2] }}>
                      <Text>{item.waist}</Text>
                    </TableCell>
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[3] }}>
                      <Text>{item.rayleigh_range}</Text>
                    </TableCell>
                  </TableRow>
                );
              }}
            />
          </TableBody>
        </Table>
      </ScrollView>
    </>
  );
}
