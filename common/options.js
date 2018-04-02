(function(global) { 'use strict'; define(async ({ // This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
	'node_modules/web-ext-utils/browser/storage': { sync: storage, },
	'node_modules/web-ext-utils/browser/version': { version, },
	'node_modules/web-ext-utils/options/': Options,
}) => {
const isBeta = (/^\d+\.\d+.\d+(?!$)/).test((global.browser || global.chrome).runtime.getManifest().version); // version doesn't end after the 3rd number ==> bata channel

const model = {
	onClose: {
		title: 'On tab close',
		default: true,
		input: { type: 'boolean', suffix: `prevent Firefox from loading unloaded tabs.`, },
		children: {
			previous: {
				default: true,
				input: { type: 'boolean', prefix: `Instead select<br>`, suffix: `the previous focused tab,`, },
			},
			direction: {
				default: +1,
				restrict: { type: 'number', match: (/^[-]?1$/), },
				input: { type: 'menulist', options: [
					{ value: +1, label: `right`, },
					{ value: -1, label: `left`, },
				], prefix: `or the closest loaded tab, prefering `, },
			},
		},
	},
	commands: {
		title: 'Keyboards shortcuts',
		default: true,
		hidden: +(/\d+/).exec(version) < 60,
		children: {
			unloadSelectedTab: {
				description: `<b>Unload</b> the current Tab`,
				default: [ ],
				maxLength: 2,
				input: { type: 'command', default: 'Alt+W', },
			},
			prevLoadedTab: {
				description: `Switch to the <b>previous</b> loaded Tab`,
				default: 'Alt+PageUp',
				minLength: 1, maxLength: 2,
				input: { type: 'command', default: 'Alt+PageUp', },
			},
			nextLoadedTab: {
				description: `Switch to the <b>next</b> loaded Tab`,
				default: 'Alt+PageDown',
				minLength: 1, maxLength: 2,
				input: { type: 'command', default: 'Alt+PageDown', },
			},
		},
	},
	debug: {
		title: 'Debug Level',
		expanded: false,
		default: +isBeta,
		hidden: !isBeta,
		restrict: { type: 'number', from: 0, to: 2, match: { exp: /^\d$/, message: 'This value must be an integer', }, },
		input: { type: 'number', suffix: `set to > 0 to enable some diagnostic logging`, },
	},
};

return (await new Options({ model, storage, prefix: 'options', })).children;

}); })(this);
