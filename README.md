# git-switcher

Save git profiles and easily switch between them.

## Installation

1. Download `gitswitcher` executable from the latest release
2. Place it somewhere of your choosing on your system
3. Set its permissions

   ```sh
   chmod +x /path/to/gitswitcher
   ```

4. Add the executable to your $PATH

   ```sh
   # fish
   set --export PATH /path/to/gitswitcher $PATH
   ```

5. Stat using the commands!

## Commands

```sh
gitswitcher add # to add a new profile
gitswitcher use # to use an existing profile
gitswitcher edit # to edit an existing profile
gitswitcher rm # to delete an existing profile
gitswitcher list # to list the current gitswitcher config file that contains the profiles
```
