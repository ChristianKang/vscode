/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import { TPromise } from 'vs/base/common/winjs.base';
import { IWindowsService } from 'vs/platform/windows/common/windows';
import { IEnvironmentService } from 'vs/platform/environment/common/environment';

// TODO@Joao: remove this dependency, move all implementation to this class
import { IWindowsMainService } from 'vs/code/electron-main/windows';

export class WindowsService implements IWindowsService {

	_serviceBrand: any;

	constructor(
		@IWindowsMainService private windowsMainService: IWindowsMainService,
		@IEnvironmentService private environmentService: IEnvironmentService
	) { }

	openFileFolderPicker(windowId: number, forceNewWindow?: boolean): TPromise<void> {
		this.windowsMainService.openFileFolderPicker(forceNewWindow);
		return TPromise.as(null);
	}

	openFilePicker(windowId: number, forceNewWindow?: boolean, path?: string): TPromise<void> {
		this.windowsMainService.openFilePicker(forceNewWindow, path);
		return TPromise.as(null);
	}

	openFolderPicker(windowId: number, forceNewWindow?: boolean): TPromise<void> {
		this.windowsMainService.openFolderPicker(forceNewWindow);
		return TPromise.as(null);
	}

	reloadWindow(windowId: number): TPromise<void> {
		const vscodeWindow = this.windowsMainService.getWindowById(windowId);

		if (vscodeWindow) {
			this.windowsMainService.reload(vscodeWindow);
		}

		return TPromise.as(null);
	}

	openDevTools(windowId: number): TPromise<void> {
		const vscodeWindow = this.windowsMainService.getWindowById(windowId);

		if (vscodeWindow) {
			vscodeWindow.win.webContents.openDevTools();
		}

		return TPromise.as(null);
	}

	toggleDevTools(windowId: number): TPromise<void> {
		const vscodeWindow = this.windowsMainService.getWindowById(windowId);

		if (vscodeWindow) {
			vscodeWindow.win.webContents.toggleDevTools();
		}

		return TPromise.as(null);
	}

	closeFolder(windowId: number): TPromise<void> {
		const vscodeWindow = this.windowsMainService.getWindowById(windowId);

		if (vscodeWindow) {
			this.windowsMainService.open({ cli: this.environmentService.args, forceEmpty: true, windowToUse: vscodeWindow });
		}

		return TPromise.as(null);
	}

	toggleFullScreen(windowId: number): TPromise<void> {
		const vscodeWindow = this.windowsMainService.getWindowById(windowId);

		if (vscodeWindow) {
			vscodeWindow.toggleFullScreen();
		}

		return TPromise.as(null);
	}

	setRepresentedFilename(windowId: number, fileName: string): TPromise<void> {
		const vscodeWindow = this.windowsMainService.getWindowById(windowId);

		if (vscodeWindow) {
			vscodeWindow.win.setRepresentedFilename(fileName);
		}

		return TPromise.as(null);
	}

	getRecentlyOpen(windowId: number): TPromise<{ files: string[]; folders: string[]; }> {
		const vscodeWindow = this.windowsMainService.getWindowById(windowId);

		if (vscodeWindow) {
			const { files, folders } = this.windowsMainService.getRecentPathsList(vscodeWindow.config.workspacePath, vscodeWindow.config.filesToOpen);
			return TPromise.as({ files, folders });
		}

		return TPromise.as({ files: [], folders: [] });
	}

	focusWindow(windowId: number): TPromise<void> {
		const vscodeWindow = this.windowsMainService.getWindowById(windowId);

		if (vscodeWindow) {
			vscodeWindow.win.focus();
		}

		return TPromise.as(null);
	}

	windowOpen(paths: string[], forceNewWindow?: boolean): TPromise<void> {
		if (!paths || !paths.length) {
			return TPromise.as(null);
		}

		this.windowsMainService.open({ cli: this.environmentService.args, pathsToOpen: paths, forceNewWindow: forceNewWindow });
		return TPromise.as(null);
	}

	openNewWindow(): TPromise<void> {
		this.windowsMainService.openNewWindow();
		return TPromise.as(null);
	}
}