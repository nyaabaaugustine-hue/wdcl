/**
 * Real photography from /media.assets, imported statically so Next bundles and
 * optimises them (nothing needs copying into /public).
 *
 * To control which photo appears where, either:
 *  - give a slot its own photo by importing it above and using it directly
 *    (see `heroBackdrop` and `facilities` in lib/data.ts), or
 *  - reorder `libraryPhotos` below. `pick(key)` chooses from it deterministically,
 *    so the same page always gets the same photo.
 */
import p01 from "@/media.assets/469056645_559342883627744_2980153655572094824_n.jpg";
import p02 from "@/media.assets/470180029_567597612806508_5492541839778977682_n.jpg";
import p03 from "@/media.assets/473268386_586013224294043_9180903339818009317_n.jpg";
import p04 from "@/media.assets/474568875_595081416720557_1623005950753328556_n.jpg";
import p05 from "@/media.assets/475056682_595072976721401_759480184077106891_n.jpg";
import p06 from "@/media.assets/492462550_689127960649235_650249861562883323_n.jpg";
import p07 from "@/media.assets/493090514_689383063957058_6020727161868166830_n.jpg";
import p08 from "@/media.assets/497725238_689382493957115_3466103620521055442_n.jpg";
import p09 from "@/media.assets/499680576_689380227290675_2405195711285599081_n.jpg";
import p10 from "@/media.assets/499717682_689383113957053_3220525606509103700_n.jpg";
import p11 from "@/media.assets/500990259_689384943956870_4577637599614272510_n.jpg";
import p12 from "@/media.assets/501041756_689380000624031_1667678181957546022_n.jpg";
import p13 from "@/media.assets/501135267_690503163845048_5279510973277743732_n.jpg";
import p14 from "@/media.assets/502475333_690508960511135_4966506066177722745_n.jpg";
import p15 from "@/media.assets/502486327_690503237178374_6755926507980933320_n.jpg";
import p16 from "@/media.assets/502513890_690503313845033_2661423684098817882_n.jpg";
import p17 from "@/media.assets/502525558_689380427290655_7615285331008638474_n.jpg";
import p18 from "@/media.assets/502551504_690503093845055_5440661887983324556_n.jpg";
import p19 from "@/media.assets/502676404_690509017177796_7335918259823258245_n.jpg";
import p20 from "@/media.assets/527944863_743506918544672_2853987844627856713_n.jpg";
import p21 from "@/media.assets/528038938_743499961878701_9046788326258799156_n.jpg";
import p22 from "@/media.assets/528038940_743500015212029_6960171856631842163_n.jpg";
import p23 from "@/media.assets/528590366_743506861878011_4228036512663791321_n.jpg";
import coi from "@/media.assets/coi.jpg";
import fd from "@/media.assets/fd.jpg";
import kk from "@/media.assets/kk.jpg";
import lkf from "@/media.assets/lkf.jpg";
import nn from "@/media.assets/nn.jpg";
import re from "@/media.assets/re.jpg";
import thd from "@/media.assets/thd.jpg";
import ttr from "@/media.assets/ttr.jpg";
import xx from "@/media.assets/xx.jpg";
import xzz from "@/media.assets/xzz.jpg";
import ytg from "@/media.assets/ytg.jpg";

export const libraryPhotos: string[] = [
  p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12,
  p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23,
  coi, fd, kk, lkf, nn, re, thd, ttr, xx, xzz, ytg,
].map((img) => img.src);

/** Stable choice: the same key always returns the same photo. */
export function pick(key: string): string {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return libraryPhotos[h % libraryPhotos.length];
}

/** Neutral alt text for photos whose subject has not been described yet. */
export const GENERIC_ALT = "A photograph from the Wiamoase Diaspora Public Library";
