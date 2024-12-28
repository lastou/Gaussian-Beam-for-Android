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
  const [position_disp, setPositionDisp] = useState(
    String(input_beam.position),
  );
  const columns = [
    {
      key: "wavelength",
    },
    {
      key: "position",
    },
    {
      key: "waist",
    },
    {
      key: "rayleigh_range",
    },
  ];
  const insets = useSafeAreaInsets();
  const items = [
    {
      key: "input_beam",
      optics: "Input beam",
      wavelength: (
        <Input
          className="max-w-56"
          value={wavelength}
          setValue={setWavelength}
        />
      ),
      position: (
        <Input value={input_beam.position} setValue={handleChangePosition} />
      ),
      waist: (
        <Input
          value={input_beam.waist}
          setValue={(value) => {
            setInputBeam({ ...input_beam, waist: Number(value) });
          }}
        />
      ),
      rayleigh_range: RayleighRange(input_beam.waist, wavelength).toFixed(3),
    },
  ];

  function handleChangePosition(value: number) {
    setInputBeam({
      ...input_beam,
      position: value,
    });
  }

  return (
    <>
      <Badge variant={"secondary"} className="w-32 bg-[#45CC43]">
        <Text>Input Beam</Text>
      </Badge>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Table aria-labelledby="input-beam" style={{ height: 150 }}>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[0] }}>
                <Text>Wavelength(nm)</Text>
              </TableHead>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[1] }}>
                <Text>Waist position(mm)</Text>
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
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[0] }}>
                      {item.wavelength}
                    </TableCell>
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[1] }}>
                      {item.position}
                    </TableCell>
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[2] }}>
                      {item.waist}
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
