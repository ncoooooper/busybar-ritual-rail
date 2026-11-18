# Firmware verification

BUSY Bar Emulator 0.1.0-beta.5, firmware 1.3.1.

Edited a three-step Focus routine using device settings, marked two steps, undid one, quit and restarted. The emulator restored Focus at step 2 (Sketch) with the custom list. Back exited cleanly (74 KiB peak).

The app was typechecked, built, installed and exercised on the emulator. Native captures are under screenshots/. The tested installable archive is in packages/.

Firmware motion pass: up, ok, start. 15 distinct frames in the controls recording. App io.ncoooooper.ritualrail exited: finished; heap peak 85.1 of 128 KiB.

## Display capture

Firmware 1.3.1 rendered both README examples. Each square in a guide GIF is one front LED in a 16 × 16 cell. The production archive was built from the source in this repository.

## Screen transition capture

Firmware 1.3.1 rendered the display sequences in the README. The release archive also ran on a fresh emulator with rapid wheel reversals and Back during a transition. The guide uses a 14 × 14 lit area inside each 16 × 16 cell. Input sequences, frame counts and the release archive checksum are in [the capture record](media/screen-transitions.json).
