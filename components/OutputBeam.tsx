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

import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FlashList } from "@shopify/flash-list";

const MIN_COLUMN_WIDTHS = [120, 120, 100, 120];

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
      key: "optics",
      label: "Optics",
    },
    {
      key: "position",
      label: "Waist position(mm)",
    },
    {
      key: "relative_position",
      label: "Relative position(mm)",
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

  const items = [
    {
      key: "output_beam",
      optics: "Output beam",
      position: output_beam.position.toFixed(3),
      relative_position: (output_beam.position - position_last_lens).toFixed(3),
      waist: output_beam.waist.toFixed(3),
      rayleigh_range: RayleighRange(output_beam.waist, wavelength).toFixed(3),
    },
  ];

  const insets = useSafeAreaInsets();

  return (
    <>
      <Badge className="w-32 bg-[#BBC920]">
        <Text>Output Beam</Text>
      </Badge>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Table aria-labelledby="input-beam" style={{ height: 150 }}>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[1] }}>
                <Text>Waist position(mm)</Text>
              </TableHead>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[1] }}>
                <Text>Relative position(mm)</Text>
              </TableHead>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[2] }}>
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
              estimatedItemSize={1}
              contentContainerStyle={{
                paddingBottom: insets.bottom,
              }}
              renderItem={({ item }) => {
                return (
                  <TableRow key={item.key}>
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[1] }}>
                      <Text>{item.position}</Text>
                    </TableCell>
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[1] }}>
                      <Text>{item.relative_position}</Text>
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
