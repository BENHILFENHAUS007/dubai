#!/usr/bin/env python3
"""Example vSphere inventory pull using pyVmomi.
Requires env vars: VSPHERE_HOST, VSPHERE_USERNAME, VSPHERE_PASSWORD
"""
import json
import os
from pyVim import connect
from pyVmomi import vim


def collect_vms(content):
    container = content.viewManager.CreateContainerView(content.rootFolder, [vim.VirtualMachine], True)
    for vm in container.view:
        yield {
            "name": vm.name,
            "uuid": vm.config.uuid if vm.config else None,
            "power_state": str(vm.runtime.powerState),
            "guest_os": vm.config.guestFullName if vm.config else None,
            "ip": vm.guest.ipAddress if vm.guest else None,
        }


if __name__ == "__main__":
    host = os.environ["VSPHERE_HOST"]
    user = os.environ["VSPHERE_USERNAME"]
    password = os.environ["VSPHERE_PASSWORD"]

    si = connect.SmartConnectNoSSL(host=host, user=user, pwd=password)
    try:
        content = si.RetrieveContent()
        print(json.dumps(list(collect_vms(content)), indent=2))
    finally:
        connect.Disconnect(si)
