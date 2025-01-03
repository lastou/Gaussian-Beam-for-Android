import InputBeam from "~/components/InputBeam";
import LensTable from "~/components/LensTable";
import OutputBeam from "~/components/OutputBeam";
import Probe from "~/components/Probe";

import Badge from "~/components/custom-ui/badge";

import { Text } from "~/components/ui/text";

import { TransformBeam } from "~/lib/calculate";
import { Lens } from "~/lib/types";

import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";

export default function GaussianBeamCalculator() {
  const [wavelength, setWavelength] = useState(1064);
  const [input_beam, setInputBeam] = useState({ position: 0, waist: 50 });
  const [lenses, setLenses] = useState<Lens[]>([]);
  const default_lens = { position: 50, focus: 50 };
  const [probe_position, setProbePosition] = useState(0);

  let output_beam = input_beam;
  let probe_beam = output_beam;
  for (const lens of lenses) {
    output_beam = TransformBeam(output_beam, lens, wavelength);
    if (probe_position > lens.position) {
      probe_beam = output_beam;
    }
  }

  return (
    <ScrollView bounces={false} showsHorizontalScrollIndicator={false}>
      <KeyboardAvoidingView className="px-0.5 py-3 gap-y-6">
        <View>
          <Badge className={"bg-[#45CC43]"}>
            <Text>Input Beam</Text>
          </Badge>
          <InputBeam
            input_beam={input_beam}
            setInputBeam={setInputBeam}
            wavelength={wavelength}
            setWavelength={setWavelength}
          />
        </View>

        <View>
          <Badge className={"bg-[#23C1ED]"}>
            <Text>Lens</Text>
          </Badge>
          <LensTable
            lenses={lenses}
            setLenses={setLenses}
            input_beam_position={input_beam.position}
            default_lens={default_lens}
          />
        </View>

        <View>
          <Badge className="bg-[#BBC920]">
            <Text>Output Beam</Text>
          </Badge>
          <OutputBeam
            output_beam={output_beam}
            wavelength={wavelength}
            position_last_lens={
              lenses.length > 0
                ? lenses[lenses.length - 1].position
                : input_beam.position
            }
          />
        </View>

        <View>
          <Badge className="bg-[#FF7A3D]">
            <Text>Probe</Text>
          </Badge>
          <Probe
            probe_position={probe_position}
            setProbePosition={setProbePosition}
            probe_beam={probe_beam}
            wavelength={wavelength}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
