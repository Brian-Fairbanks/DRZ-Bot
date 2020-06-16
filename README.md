# DRZ-Bot
![travis badge](https://img.shields.io/travis/Brian-Fairbanks/TV-Tracker)

## Description
<img src="https://raw.githubusercontent.com/Brian-Fairbanks/DiceRollerz/master/client/public/icons/DRZ.png" align="right" alt="Dice Rollerz Logo by Brian Fairbanks" width="150" height="150">
DiceRollerz Discord Bot

- Running off my last project, Dice Rollers, I decided that I did not need to recreate the wheel and develop my own full functioned chat system
- I have instead decided to convert my ideas from that project, and instead make a chat bot for discord that would handle the same kind of server based commands


## Table of Contents
* [License](#license)
* [Scripts](#Scripts)
* [Dependencies](#dependencies)
* [Testing](#tests)
* [Commands](#commands)
* [Credits](#contributing)
* [Questions](#questions)

## License

<details open>
<summary>ICS License</summary>
<br>
Copyright 2020 Brian Fairbanks

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
</details>


## Scripts
### Install
    npm install
### Run (production)
    npm start

## Dependencies

### Node Extensions
* discord.js: ^12.2.0
* dotenv: ^8.2.0

## Tests
Manually tested.  No additinal frameworks used.

## Commands
### Working
#### Inv
-   `inv
-   `inv [a/add] [#] [item]
-   `inv [r/remove] [#/a/all] [item]
#### Roll
-  These rolls are tokenized, and can have multiple sets strung together
  -   `r/roll [#]d[#] [modifiers]- `r 10d20
##### Modifiers
-  min[#] - `r 10d10 min 5
-  [s/sort] - `r 10d10 sort

##### Pre Conditions
- `r adv [roll] - `r adv d20+4

### Not Yet Implemented

## Contributing
* [Brian Fairbanks](https://github.com/Brian-Fairbanks)




## Questions
If you have any questions about this application, feel free to reach out to one of our members below:

<img src="https://avatars0.githubusercontent.com/u/59707181?v=4" height="32" width="32"> | brian.k.fairbanks@gmail.com
