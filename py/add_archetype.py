"""
This document adds a new archetype to ../js/Archetypes.js according to user input in terminal
"""
import os
import sys

f = open(os.path.join(".", "js", "Archetypes.js"), "a")

def checkExit(inp : str) -> bool:
    inp = inp.strip()
    if inp == "r":
        return True
    elif inp == "x":
        f.close()
        sys.exit()
    else:
        return False


while True:
    print("Type r at any point to restart loop, type x at any point to exit")
    name = input("Input name of Archetype:\n").strip()
    if checkExit(name):
        continue
    description = input("Input Archetype description:\n").strip()
    if checkExit(description):
        continue
    print("entering boon. If boon already exists (unlikely) type something before continuing. Else press enter.")
    is_f = input()
    boonName = input("Enter boon name")
    if is_f == "\n":
        boon_description = input("Enter boon description")
        boon_type = input("Is this boon an action (a), passive (p) or normal boon (b)?\n").strip()

        

    write_str = f""