import Input from "~/components/custom-ui/input";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Text } from "~/components/ui/text";

import { Lens } from "~/lib/types";

import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { FlashList } from "@shopify/flash-list";

const MIN_COLUMN_WIDTHS = [120, 120, 100, 120];

export default function LensTable({
  lenses,
  setLenses,
  input_beam_position,
  default_lens,
}: {
  lenses: Lens[];
  setLenses: (lenses: Lens[]) => void;
  input_beam_position: number;
  default_lens: Lens;
}) {
  const [state_key, setStateKey] = useState(0);
  function updateStateKey() {
    setStateKey((state_key + 1) % 2);
  }

  const [num_display, setNumDisplay] = useState(
    lenses.map((lens) => ({
      position: String(lens.position),
      focus: String(lens.focus),
    })),
  );

  const columns = [
    {
      key: "optics",
    },
    {
      key: "position",
    },
    {
      key: "relative_position",
    },
    {
      key: "focus",
    },
    {
      key: "action",
    },
  ];
  const items = lenses.map((lens, index) => ({
    key: index,
    optics: "Lens",
    position: (
      <Input
        className="max-w-20 justify-self-center"
        value={lens.position}
        setValue={(value) => {
          handleChangePosition(index, value);
          updateStateKey();
        }}
      />
    ),
    relative_position:
      index > 0
        ? lenses[index].position - lenses[index - 1].position
        : lenses[index].position - input_beam_position,
    focus: (
      <Input
        className="max-w-20 justify-self-center"
        value={lens.focus}
        setValue={(value) => {
          handleChangeFocus(index, value);
        }}
      />
    ),
    action: (
      <Button
        className="w-20"
        variant={"destructive"}
        size="sm"
        onPress={() => handleDeleteLens(index)}
      >
        Delete
      </Button>
    ),
  }));

  function handleAddLens() {
    setLenses(
      [...lenses, default_lens].sort((a, b) => a.position - b.position),
    );

    updateStateKey();
  }

  function handleDeleteLens(index: number) {
    setLenses(lenses.filter((_, i) => i !== index));
    updateStateKey();
    // setNumDisplay(num_display.filter((_, i) => i !== index));
  }

  function handleChangePosition(index: number, value: number) {
    setLenses(
      lenses
        .map((lens, i) => {
          if (i === index) {
            return { ...lens, position: value };
          } else {
            return lens;
          }
        })
        .sort((a, b) => a.position - b.position),
    );
  }

  function handleChangeFocus(index: number, value: number) {
    setLenses(
      lenses.map((lens, i) => {
        if (i === index) {
          return { ...lens, focus: value };
        } else {
          return lens;
        }
      }),
    );
  }

  function handleChangeDisplayPosition(index: number, value: string) {
    setNumDisplay(
      num_display.map((item, i) => {
        if (i === index) {
          return { ...item, position: value };
        }
        return item;
      }),
    );
  }

  function handleChangeDisplayFocus(index: number, value: string) {
    setNumDisplay(
      num_display.map((item, i) => {
        if (i === index) {
          return { ...item, focus: value };
        }
        return item;
      }),
    );
  }

  return (
    <>
      <Badge className="w-32 bg-[#23C1ED]">
        <Text>Lens</Text>
      </Badge>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Table aria-labelledby="lenses" style={{ height: 300 }}>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[1] }}>
                <Text>Position(mm)</Text>
              </TableHead>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[2] }}>
                <Text>Relative position(mm)</Text>
              </TableHead>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[3] }}>
                <Text>Focus(mm)</Text>
              </TableHead>
              <TableHead style={{ width: MIN_COLUMN_WIDTHS[3] }}>
                <Button
                  className="w-20"
                  variant={"default"}
                  size="sm"
                  onPress={() => handleAddLens()}
                >
                  <Text>Add lens</Text>
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <FlashList
              key={state_key}
              data={items}
              estimatedItemSize={5}
              nestedScrollEnabled
              renderItem={({ item, index }) => {
                return (
                  <TableRow>
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[1] }}>
                      {item.position}
                    </TableCell>
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[2] }}>
                      <Text>
                        {index > 0
                          ? lenses[index].position - lenses[index - 1].position
                          : lenses[index].position - input_beam_position}
                      </Text>
                    </TableCell>
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[3] }}>
                      {item.focus}
                    </TableCell>
                    <TableCell style={{ width: MIN_COLUMN_WIDTHS[3] }}>
                      <Button
                        className="w-20"
                        variant={"destructive"}
                        size="sm"
                        onPress={() => handleDeleteLens(index)}
                      >
                        <Text>Delete</Text>
                      </Button>
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
