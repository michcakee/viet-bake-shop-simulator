import { useEffect, useState } from 'react';
import { ECON } from '../data/config';
import { DIAMOND, DREAM, DREAM_ORDER, DREAM_PASS, type DreamDef, type DreamId } from '../data/dream';
import { ROLES } from '../data/world';
import { dreamApplicant } from '../engine/labor';
import { featureOn } from '../engine/unlocks';
import { money, money2 } from '../lib/format';
import { useGame } from './GameContext';
import { Btn } from './kit';
import { Modal } from './overlays';
import { Person, Sprite } from './pixel/Sprite';
import { buyDreamTeam, canBuy, restoreDreamTeam, storePrice } from './purchases';

const x = (m: number) => `${(1 / m).toFixed(1).replace(/\.0$/, '')}×`;

/** What makes each of them special, in a few short chips. */
function Perks({ d }: { d: DreamDef }) {
  return (
    <ul className="dream-perks">
      <li>
        <b>Serves everything</b>, never fumbles an order
      </li>
      <li>
        <b>{x(d.speed.tray)}</b> pastries · <b>{x(d.speed.drink)}</b> drinks · <b>{x(d.speed.sandwich)}</b> bánh mì, faster than a pro
      </li>
      <li className="dream-tip-perk">
        <Sprite name="coin" scale={2} /> Tips <b>×{d.tipMult}</b>, plus <b>{money2(d.tipFlat)}</b> on every great order
      </li>
      <li>
        {d.trays >= 3 ? <b>+{d.trays} trays</b> : `+${d.trays} trays`} prepped each morning{d.bakeQuality >= 5 ? <>, <b>+{d.bakeQuality} bake quality</b></> : ''}
      </li>
    </ul>
  );
}

function Member({ id }: { id: DreamId }) {
  const { state: s, dispatch } = useGame();
  const d = DREAM[id];
  const unlocked = (s.dreamTeam ?? []).includes(id);
  const hired = s.staff.find((e) => e.dream === id);
  const applicant = s.applicants.find((a) => a.dream === id);
  const diamonds = s.diamonds ?? 0;
  const fee = Math.round(ECON.labor.hiringCost * s.macro.priceIndex);
  const wage = applicant?.wage ?? dreamApplicant(s, id, 0).wage;
  const canHire = featureOn(s, 'staff.hire');
  return (
    <li className={`dream-card ${unlocked ? 'is-unlocked' : 'not-yet'}`}>
      <div className="dream-face">
        <Person look={d.look} scale={4} />
        <span className="dream-spike">{d.spike}</span>
      </div>
      <div className="dream-info">
        <b className="dream-name">{d.name}</b>
        <span className="small muted">{ROLES[d.role].name} · skill 5 · {money2(wage)}/hour</span>
        <p className="small">{d.blurb}</p>
        <Perks d={d} />
        <em className="small dream-quote">“{d.quote}”</em>
      </div>
      <div className="dream-act">
        {!unlocked ? (
          <Btn kind={diamonds >= d.cost ? 'go' : 'plain'} disabled={diamonds < d.cost} onClick={() => dispatch({ type: 'unlockDream', id })} sfx="sparkle">
            Unlock <Sprite name="diamond" scale={2} /> {d.cost}
          </Btn>
        ) : hired ? (
          <span className="dream-hired">
            On your team
            <span className="small">{money2(hired.tips ?? 0)} in tips so far</span>
          </span>
        ) : canHire && applicant ? (
          <Btn kind="primary" disabled={s.phase === 'service' || s.cash < fee} onClick={() => dispatch({ type: 'hire', applicantId: applicant.id })}>
            Hire ({money(fee)} fee)
          </Btn>
        ) : (
          <span className="small muted">Unlocked! You can hire them once Bà teaches hiring (about day 7).</span>
        )}
      </div>
    </li>
  );
}

/** How to earn diamonds, and (iOS app only) the one purchase: the whole team at once. */
function GetDiamonds() {
  const { dispatch, state: s } = useGame();
  const [price, setPrice] = useState<string | null>(null);
  const [asked, setAsked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const store = canBuy();
  const all = DREAM_ORDER.every((id) => (s.dreamTeam ?? []).includes(id));
  const grant = () => dispatch({ type: 'ownDreamTeam' });
  useEffect(() => {
    if (store) void storePrice().then((p) => (setPrice(p), setAsked(true)));
  }, [store]);
  const buy = async () => {
    setBusy(true);
    setNote(null);
    const r = await buyDreamTeam(grant);
    setBusy(false);
    setNote(r.ok ? 'Thank you! The whole Dream team is yours.' : r.message);
  };
  const restore = async () => {
    setBusy(true);
    setNote(null);
    const r = await restoreDreamTeam(grant);
    setBusy(false);
    setNote(r.message);
  };
  return (
    <section className="get-diamonds" aria-label="Get the Dream team">
      <p className="small free-diamonds">
        <Sprite name="star" scale={2} />
        <span>
          <b>Free:</b> every 3-star day pays <b>{DIAMOND.perThreeStarDay} diamonds</b>.{(s.diamondsEarned ?? 0) > 0 && ` This bakery has earned ${s.diamondsEarned} so far.`}
        </span>
      </p>
      {store && !all && (
        <>
          <button type="button" className="diamond-pack dream-pass" disabled={!price || busy} onClick={() => void buy()}>
            <span className="pack-name">{DREAM_PASS.name}, right now</span>
            <span className="pack-note">One purchase, yours for good. Nothing else is for sale.</span>
            <b className="pack-price">{busy ? 'One moment…' : price ?? (asked ? 'Not available' : '…')}</b>
          </button>
          {asked && !price && <p className="small muted">The App Store isn’t answering right now. Check your connection and open this again.</p>}
        </>
      )}
      {store && (
        <button type="button" className="link-btn restore-btn" disabled={busy} onClick={() => void restore()}>
          Restore purchase
        </button>
      )}
      {!store && <p className="small muted">Nothing is sold here. Earn diamonds with 3-star days.</p>}
      {note && (
        <p className="small purchase-note" role="status">
          {note}
        </p>
      )}
    </section>
  );
}

export function DreamTeamSheet({ onClose }: { onClose: () => void }) {
  const { state: s } = useGame();
  return (
    <Modal label="Dream team" onClose={onClose} className="drawer sheet dream-sheet">
      <div className="dream-head">
        <h2>Dream team</h2>
        <span className="diamond-balance" aria-label={`${s.diamonds ?? 0} diamonds`}>
          <Sprite name="diamond" scale={3} /> <b>{s.diamonds ?? 0}</b>
        </span>
      </div>
      <p className="dream-lede">
        Five all-rounders who serve anything, two to three times faster than the best person you can hire, and give such good service that customers tip <b>two to three times more</b>. Each has one thing they’re simply the best at.
      </p>
      <GetDiamonds />
      <ul className="dream-list">
        {DREAM_ORDER.map((id) => (
          <Member key={id} id={id} />
        ))}
      </ul>
      <p className="small muted">Diamonds and the Dream team you unlock belong to this device: every bakery you play here shares them. A Dream team bought in the app comes back with Restore purchase. Let someone go and they wait in the applicants to be hired again.</p>
    </Modal>
  );
}

/** The Dream team on the Staff tab: who's unlocked, and a way in. */
export function DreamTeamCard({ onOpen }: { onOpen: () => void }) {
  const { state: s } = useGame();
  const team = s.dreamTeam ?? [];
  return (
    <section className="card dream-strip" aria-label="Dream team">
      <div className="dream-strip-faces" aria-hidden="true">
        {DREAM_ORDER.map((id) => (
          <span key={id} className={team.includes(id) ? 'on' : ''}>
            <Person look={DREAM[id].look} scale={2} />
          </span>
        ))}
      </div>
      <div className="dream-strip-text">
        <b>Dream team</b>
        <span className="small">
          {team.length === 0 ? 'Five all-rounders, far faster than anyone, with the biggest tips in town.' : `${team.length} of 5 unlocked.`} You have <Sprite name="diamond" scale={2} /> {s.diamonds ?? 0}.
        </span>
      </div>
      <Btn kind="primary" onClick={onOpen}>
        See them
      </Btn>
    </section>
  );
}
