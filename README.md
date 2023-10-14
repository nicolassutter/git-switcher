# gitswitcher

Save git profiles and easily switch between them.

## 🚀 Installation

1. Download `gitswitcher` executable from the latest [release](https://github.com/nicolassutter/gitswitcher/releases)
2. Place it somewhere of your choosing on your system
3. Rename the file to `gitswitcher` (or anything that might suit you better)
4. Set its permissions

   ```sh
   chmod +x /path/to/gitswitcher
   ```

5. Add the executable parent directory to your $PATH

   ```sh
   # fish -> ~/.config/fish/config.fish
   set --export PATH /path/to/gitswitcher/parent/directory $PATH
   # If you placed your executable file at ~/Documents/bin/gitswitcher, you can add it to your $PATH like this:
   # set --export PATH ~/Documents/bin $PATH

   # bash -> ~/.bashrc
   export PATH=/path/to/gitswitcher/parent/directory:$PATH
   # If you placed your executable file at ~/Documents/bin/gitswitcher, you can add it to your $PATH like this:
   # export PATH=~/Documents/bin:$PATH

   # zsh -> ~/.zshrc
   export PATH=/path/to/gitswitcher/parent/directory:$PATH
   # If you placed your executable file at ~/Documents/bin/gitswitcher, you can add it to your $PATH like this:
   # export PATH=~/Documents/bin:$PATH
   ```

6. Restart your shell
7. Stat using the commands!

## ⚙️ Commands

```sh
gitswitcher add # to add a new profile
gitswitcher use # to use an existing profile
gitswitcher edit # to edit an existing profile
gitswitcher rm # to delete an existing profile
gitswitcher list # to list the current gitswitcher config file that contains the profiles
```
