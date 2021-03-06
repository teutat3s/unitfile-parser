export const string = `[Unit]
Description=Network Manager Script Dispatcher Service

[Service]
Type=dbus
BusName=org.freedesktop.nm_dispatcher
ExecStart=/usr/lib/nm-dispatcher

# We want to allow scripts to spawn long-running daemons, so tell
# systemd to not clean up when nm-dispatcher exits
KillMode=process

[Install]
Alias=dbus-org.freedesktop.nm-dispatcher.service
`;

export const ast = {
  "type": "unitFile",
  "comments": [],
  "sections": [
    {
      "type": "section",
      "title": "Unit",
      "body": [
        {
          "type": "setting",
          "name": "Description",
          "value": "Network Manager Script Dispatcher Service"
        }
      ]
    },
    {
      "type": "section",
      "title": "Service",
      "body": [
        {
          "type": "setting",
          "name": "Type",
          "value": "dbus"
        },
        {
          "type": "setting",
          "name": "BusName",
          "value": "org.freedesktop.nm_dispatcher"
        },
        {
          "type": "setting",
          "name": "ExecStart",
          "value": "/usr/lib/nm-dispatcher"
        },
        {
          "type": "comment",
          "value": "We want to allow scripts to spawn long-running daemons, so tell"
        },
        {
          "type": "comment",
          "value": "systemd to not clean up when nm-dispatcher exits"
        },
        {
          "type": "setting",
          "name": "KillMode",
          "value": "process"
        }
      ]
    },
    {
      "type": "section",
      "title": "Install",
      "body": [
        {
          "type": "setting",
          "name": "Alias",
          "value": "dbus-org.freedesktop.nm-dispatcher.service"
        }
      ]
    }
  ]
};
