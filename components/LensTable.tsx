import Table from "./custom-ui/table";

import Input from "~/components/custom-ui/input";
import Text from "~/components/custom-ui/text";

import { Button } from "~/components/ui/button";

import { Add } from "~/lib/icons/Add";
import { Delete } from "~/lib/icons/Delete";
import { Lens } from "~/lib/types";

import { useState } from "react";
import { View } from "react-native";

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

  const columns = [
    {
      key: "position",
      label: <Text className="font-bold">Position (mm)</Text>,
      width: 88,
    },
    {
      key: "relative_position",
      label: <Text className="font-bold">Relative Position (mm)</Text>,
    },
    {
      key: "focus",
      label: <Text className="font-bold">Focus (mm)</Text>,
      width: 80,
    },
    {
      key: "action",
      label: (
        <Button
          variant={"ghost"}
          onPress={() => handleAddLens()}
          className="mr-4"
        >
          <Add className="stroke-primary" size={23} strokeWidth={1.25} />
        </Button>
      ),
      width: 72,
    },
  ];
  const items = lenses.map((lens, index) => ({
    key: index,

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
    relative_position: (
      <Text>
        {(index > 0
          ? lenses[index].position - lenses[index - 1].position
          : lenses[index].position - input_beam_position
        ).toFixed(3)}
      </Text>
    ),
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
        variant={"ghost"}
        onPress={() => handleDeleteLens(index)}
        className="mr-3.5"
      >
        <Delete className="stroke-destructive" size={23} strokeWidth={1.25} />
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

  return (
    <Table
      columns={columns}
      items={items}
      aria-labelledby="lenses"
      className="h-64"
      state_key={state_key}
      flashListProps={{
        nestedScrollEnabled: true,
        ItemSeparatorComponent: () => <View className="h-0.5 bg-slate-100" />,
        ListEmptyComponent: (
          <View className="h-44 justify-center">
            <Text className="text-xl">No Lens</Text>
          </View>
        ),
      }}
    />
  );
}
