import InputBeam from "~/components/InputBeam";
import LensTable from "~/components/LensTable";
import OutputBeam from "~/components/OutputBeam";
import Probe from "~/components/Probe";

import { TransformBeam } from "~/lib/calculate";
import { Lens } from "~/lib/types";

import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MIN_COLUMN_WIDTHS = [120, 120, 100, 120];

export default function GaussianBeamCalculator() {
  const default_lens = { position: 50, focus: 50 };

  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [wavelength, setWavelength] = useState(1064);
  const [input_beam, setInputBeam] = useState({ position: 0, waist: 50 });
  // const [lenses, setLenses] = useState<Lens[]>([default_lens]);
  const [lenses, setLenses] = useState<Lens[]>([]);
  const [probe_position, setProbePosition] = useState(0);
  const columnWidths = useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);

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
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <InputBeam
          input_beam={input_beam}
          setInputBeam={setInputBeam}
          wavelength={wavelength}
          setWavelength={setWavelength}
        />

        <LensTable
          lenses={lenses}
          setLenses={setLenses}
          input_beam_position={input_beam.position}
          default_lens={default_lens}
        />

        <OutputBeam
          output_beam={output_beam}
          wavelength={wavelength}
          position_last_lens={
            lenses.length > 0
              ? lenses[lenses.length - 1].position
              : input_beam.position
          }
        />

        <Probe
          probe_position={probe_position}
          setProbePosition={setProbePosition}
          probe_beam={probe_beam}
          wavelength={wavelength}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
