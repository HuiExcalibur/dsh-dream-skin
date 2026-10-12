/**
 * dsh-dream-skin — HASH LITERALS WE KEEP ON PURPOSE (issue #92).
 *
 * The gate in `tests/hashes.test.cjs` refuses a build-hash literal that the
 * host corpus does not contain: such a selector cannot match anything, and the
 * repository's anchor discipline says to hang a stable `data-*` attribute
 * instead. This file is the escape hatch — and like every escape hatch here it
 * is dated, reasoned, and machine-checked:
 *
 *   - a `legacy-host-line` entry must name the host line it is kept for
 *     (`since`), because that is the only reason these can exist at all;
 *   - the entry must still be USED somewhere in the shipped surface — an
 *     allowance nobody needs is a permission, not a decision;
 *   - and it must still measure 0 hits. The moment the corpus grows the hash
 *     back, the excuse has outlived its reason and the gate says so (the same
 *     rule the forward-gap `since` field uses in issue #88).
 *
 * Each live entry also shows up as a FINDING in the gate's output rather than
 * passing silently: "we deliberately keep a dead selector" is a fact a human
 * has to know about, and the finding is pinned by name in the test file so it
 * cannot quietly disappear.
 */

/** The vocabulary. One word today; the gate rejects anything else. */
const DEAD_HASH_KINDS = ['legacy-host-line'];

const DEAD_HASHES = {
	bqrRRG: {
		kind: 'legacy-host-line',
		since: '0.1.0-rc.6',
		why:
			'`bqrRRG_card` was the inline-warning card. On 0.2.0-rc.1 it is 0 hits in the whole installed ' +
			'host tree, so the rule and the drift-probe group can never match there. Kept because README still ' +
			'declares `0.1.0-rc.6 ~ 0.1.x` support and this repository holds no 0.1.x corpus to prove it dead ' +
			'there too — that half is an assumption, not a measurement.'
	},
	nArs4W: {
		kind: 'legacy-host-line',
		since: '0.1.0-rc.6',
		why:
			'`nArs4W_panel` / `_pane` / `_paneContent` / `_workbench` / `_explorerBody` were the right ' +
			'file panel and workbench. 0 hits on 0.2.0-rc.1 in the installed tree; the 10.5.0 third-party ' +
			'review measured the same and asked for it to be declared publicly (see docs/desktop-support.md ' +
			'"锚点依赖与漂移探针"). Same unresolved 0.1.x question as the entry above.'
	},
	qDHVXG: {
		kind: 'legacy-host-line',
		since: '0.1.0-rc.6',
		why:
			'`qDHVXG_fade` was the conversation list foot fade. 0 hits on 0.2.0-rc.1. The surface itself ' +
			'still exists under a new hash, which is why the rule is kept as an OR-fallback rather than ' +
			'deleted: deleting it would silently drop the 0.1.x line instead of measuring it.'
	}
};

/**
 * HASHES THAT LIVE ON ONE CHANNEL AND NOT THE OTHER (Roadmap A1, 10.12.1).
 *
 * These are NOT the case above: `DEAD_HASHES` admits a hash that measures 0 hits in the
 * installed npm tree. The groups below measure PRESENT on npm `0.2.0-rc.1` and ABSENT from
 * the official desktop shell's `app.asar` (`@deepseek-ai/dsh-desktop 0.2.0-rc.2`) — the two
 * channels re-roll their CSS-module hashes independently. On the shell the drift probe used
 * to file them as `drifted`, which made the documented positive signal
 * (`drifted: [] && pending: false`) unreachable on exactly the host users run the desktop
 * app on. They are reported in their own pool (`anchors.channelAbsent`) instead — but only
 * while a gate can re-derive WHY, which is what the fields below exist for:
 *
 *   - `module` is the CSS module PATH, not a hash. Paths survive a re-roll; hashes do not
 *     (measured: all 95 npm module paths also exist in the shell bundle).
 *   - `shellBase` is a CLAIM. `tests/hashes.test.cjs` re-derives it from the shell bundle and
 *     reddens if it disagrees — a hand-copied successor is exactly the "our own number equals
 *     our own number" shape this repository has been bitten by four times.
 *   - `npmBase` must still measure > 0 in the installed npm tree, and `shellBase` must still
 *     measure 0. If either flips, this is no longer a channel divergence and the gate says so:
 *     the first means the shell adopted our hash back, the second means we are keeping a dead
 *     selector that belongs in `DEAD_HASHES` instead.
 *   - `harmlessBecause` is required when the entry claims the loss cannot be seen: the claim is
 *     checked against the shell's own declaration for that class, not against prose.
 */
const CHANNEL_DIVERGENT_KINDS = ['channel-divergent'];

const CHANNEL_DIVERGENT_GROUPS = {
	'.lXshSW_root, ._7yHdaG_panel': {
		kind: 'channel-divergent',
		measuredAt: '2026-10-12',
		surfaces: [
			{ module: 'skeleton/TodoPanel.module.css', npmPackage: 'dsh-client-ui-conversation', npmBase: 'lXshSW', shellBase: 'aSus8q' },
			{ module: 'queue/QueueDock.module.css', npmPackage: 'dsh-client-ui-conversation', npmBase: '_7yHdaG', shellBase: 'v1kfCW' }
		],
		effect: 'cosmetic',
		why:
			'The rule adds `backdrop-filter: blur(20px) saturate(140%)` to the todo panel and the queue dock under ' +
			'`@supports`. Both hashes are present on npm 0.2.0-rc.1 (2 and 4 occurrences in ' +
			'dsh-client-ui-conversation) and 0 occurrences in the shell bundle, where the same two module paths are ' +
			'drawn as `aSus8q_*` and `v1kfCW_*`. What is lost on the shell is our frosting on those two surfaces — ' +
			'the host still paints its own `--dsw-specific-menu` background there, so this is a difference in look, ' +
			'not a broken surface. Not closed by switching to `[class$="_dock"]`: that suffix has only 3 bases on ' +
			'the shell but one of them is `RlGAzG_dock`, the composer\'s own InputBar dock, and blurring the composer ' +
			'is the tooltip containing-block regression recorded in lib/client.js. A successor anchor has to be ' +
			'derived per module, which is its own piece of work (Roadmap A1 remaining half).'
	},
	'.uV2eYG_root': {
		kind: 'channel-divergent',
		measuredAt: '2026-10-12',
		surfaces: [
			{ module: 'skeleton/InputBar.module.css', npmPackage: 'dsh-client-ui-conversation', npmBase: 'uV2eYG', shellBase: 'RlGAzG' }
		],
		effect: 'harmless',
		harmlessBecause: { module: 'skeleton/InputBar.module.css', classSuffix: 'root', mustNotDeclare: 'background' },
		why:
			'The rule clears a bottom-scrim that used to frame the composer (`background: transparent` on the root). ' +
			'On the shell the same module draws its root as `RlGAzG_root`, and that declaration block carries no ' +
			'`background` at all — there is nothing for our rule to undo, so the missing hash cannot change a pixel. ' +
			'The rule also carries our own `[data-dsh-dream-skin-composer]` selector, which is why the surface is not ' +
			'unattended on hosts where the hash rolled; the probe deliberately still refuses to count that marker as ' +
			'evidence (T1 in lib/client.js), and this entry is what lets the honest "absent on this channel" verdict ' +
			'be published instead of a permanent drift alarm.'
	}
};

module.exports = { DEAD_HASHES, DEAD_HASH_KINDS, CHANNEL_DIVERGENT_GROUPS, CHANNEL_DIVERGENT_KINDS };
