// ============================================================
// Interactive Tree Diagram Engine — v2 (Polished)
// Features: expand/collapse, zoom, search, mini-map, tooltips,
//           smooth animations, better connectors, keyboard nav
// ============================================================

const COLORS = {
    platform: { bg: '#1e1b4b', border: '#6d28d9', text: '#c4b5fd' },
    superadmin: { bg: '#7c3aed', border: '#5b21b6', text: '#fff' },
    admin: { bg: '#1e40af', border: '#1e3a8a', text: '#bfdbfe' },
    plan: { bg: '#4c1d95', border: '#3b0764', text: '#ddd6fe' },
    seller: { bg: '#0369a1', border: '#075985', text: '#bae6fd' },
    sellerSub: { bg: '#0c4a6e', border: '#082f49', text: '#bae6fd' },
    store: { bg: '#0e7490', border: '#155e75', text: '#cffafe' },
    storeCfg: { bg: '#164e63', border: '#083344', text: '#a5f3fc' },
    product: { bg: '#065f46', border: '#022c22', text: '#6ee7b7' },
    productSub: { bg: '#064e3b', border: '#022c22', text: '#a7f3d0' },
    service: { bg: '#065f46', border: '#022c22', text: '#6ee7b7' },
    category: { bg: '#14532d', border: '#052e16', text: '#bbf7d0' },
    subplan: { bg: '#92400e', border: '#451a03', text: '#fde68a' },
    coupon: { bg: '#7f1d1d', border: '#450a0a', text: '#fca5a5' },
    shipping: { bg: '#374151', border: '#1f2937', text: '#d1d5db' },
    widget: { bg: '#374151', border: '#1f2937', text: '#d1d5db' },
    customer: { bg: '#166534', border: '#052e16', text: '#86efac' },
    customerSub: { bg: '#14532d', border: '#052e16', text: '#bbf7d0' },
    wallet: { bg: '#b45309', border: '#78350f', text: '#fde68a' },
    walletSub: { bg: '#92400e', border: '#451a03', text: '#fde68a' },
    cart: { bg: '#134e4a', border: '#042f2e', text: '#99f6e4' },
    order: { bg: '#1e3a8a', border: '#172554', text: '#93c5fd' },
    orderSub: { bg: '#1e3a8a', border: '#172554', text: '#bfdbfe' },
    subscription: { bg: '#7c2d12', border: '#431407', text: '#fdba74' },
    subscriptionSub: { bg: '#7c2d12', border: '#431407', text: '#fdba74' },
    comm: { bg: '#4a1d96', border: '#3b0764', text: '#c4b5fd' },
    app: { bg: '#374151', border: '#1f2937', text: '#d1d5db' },
    plugin: { bg: '#374151', border: '#1f2937', text: '#d1d5db' },
    edge: { bg: '#991b1b', border: '#7f1d1d', text: '#fca5a5' },
    loyalty: { bg: '#14532d', border: '#052e16', text: '#bbf7d0' },
    analytics: { bg: '#312e81', border: '#1e1b4b', text: '#c7d2fe' }
};

const NODE_W = 220, V_GAP = 12, H_GAP = 36, ANIM_MS = 250;
let allNodes = [], scale = 1, expandedIds = new Set(), searchTerm = '', tooltipTimeout = null;

// ── Helpers ──
function countAll(n) { if (!n.children || !n.children.length) return 0; let c = n.children.length; n.children.forEach(ch => c += countAll(ch)); return c }
function getColor(c) { return COLORS[c] || COLORS.widget }
function getH(n) { let h = 40; if (n.desc) h += 14; if (n.edge) h += 14; return h }

function findNode(node, id) {
    if (node.id === id) return node;
    if (node.children) for (const ch of node.children) { const f = findNode(ch, id); if (f) return f }
    return null;
}

function findParentPath(tree, targetId, trail) {
    if (tree.id === targetId) return trail;
    if (tree.children) for (const ch of tree.children) { const r = findParentPath(ch, targetId, [...trail, tree]); if (r) return r }
    return null;
}

// ── Flatten visible tree ──
function flattenVisible(node, depth, parentId) {
    const isExp = expandedIds.has(node.id);
    const total = countAll(node);
    const match = !searchTerm || node.name.toLowerCase().includes(searchTerm) || (node.desc && node.desc.toLowerCase().includes(searchTerm));
    const result = [{ ...node, depth, parentId, isExpanded: isExp, totalChildren: total, matchesSearch: match }];
    if (isExp && node.children) node.children.forEach(ch => result.push(...flattenVisible(ch, depth + 1, node.id)));
    return result;
}

// ── Layout ──
function layoutNodes(flatList) {
    let y = 20;
    flatList.forEach(n => {
        n._x = 30 + n.depth * (NODE_W + H_GAP);
        n._y = y;
        n._h = getH(n);
        y += n._h + V_GAP;
    });
    return flatList;
}

// ── Render ──
function render() {
    const container = document.getElementById('tree-container');
    container.innerHTML = '';
    const flat = flattenVisible(TREE_DATA, 0, null);
    const laid = layoutNodes(flat);
    allNodes = laid;

    let maxX = 0, maxY = 0;
    laid.forEach(n => { maxX = Math.max(maxX, n._x + NODE_W + 60); maxY = Math.max(maxY, n._y + n._h + 60) });
    container.style.width = maxX + 'px';
    container.style.height = maxY + 'px';

    // SVG connectors
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'connector');
    svg.style.cssText = `position:absolute;top:0;left:0;width:${maxX}px;height:${maxY}px;pointer-events:none;z-index:0`;

    laid.forEach(n => {
        if (!n.parentId) return;
        const parent = laid.find(p => p.id === n.parentId);
        if (!parent) return;
        const x1 = parent._x + NODE_W - 2, y1 = parent._y + parent._h / 2;
        const x2 = n._x + 2, y2 = n._y + n._h / 2;
        const mx = (x1 + x2) / 2;
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', n.color === 'edge' ? '#7f1d1d' : '#4c1d95');
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('stroke-dasharray', n.color === 'edge' ? '3,3' : '5,4');
        path.setAttribute('opacity', '0.45');
        svg.appendChild(path);
    });
    container.appendChild(svg);

    // Nodes
    laid.forEach(n => {
        const col = getColor(n.color);
        const div = document.createElement('div');
        div.className = 'node ' + (n.isExpanded ? 'expanded' : 'collapsed');
        div.id = 'node-' + n.id;
        div.style.cssText = `left:${n._x}px;top:${n._y}px;width:${NODE_W}px;background:${col.bg};border-color:${col.border};color:${col.text}`;
        if (!n.matchesSearch && searchTerm) div.style.opacity = '0.2';
        if (n.color === 'edge') div.style.borderStyle = 'dashed';

        let html = `<div class="node-title"><span class="node-icon">${n.icon || ''}</span><span>${n.name}</span>`;
        if (n.children && n.children.length > 0) {
            if (!n.isExpanded) html += `<span class="node-children-badge">${n.totalChildren}</span>`;
            html += `<span class="node-expand-icon">${n.isExpanded ? '▾' : '▸'}</span>`;
        }
        html += `</div>`;
        if (n.desc) html += `<div class="node-desc">${n.desc}</div>`;
        if (n.edge) html += `<div class="node-edge">⚠ ${n.edge}</div>`;
        div.innerHTML = html;

        // Click handler
        if (n.children && n.children.length > 0) {
            div.addEventListener('click', e => {
                e.stopPropagation();
                if (expandedIds.has(n.id)) { collapseR(n.id) } else { expandedIds.add(n.id) }
                render();
                updateBread(n);
                updateMinimap();
            });
        }

        // Hover tooltip
        div.addEventListener('mouseenter', e => { showTooltip(n, e) });
        div.addEventListener('mouseleave', () => { hideTooltip() });

        container.appendChild(div);
    });

    // Stats
    const totalAll = countAll(TREE_DATA) + 1;
    document.getElementById('stats').innerHTML = `<span>${laid.length}</span> / <span>${totalAll}</span> nodes`;
    updateMinimap();
}

// ── Collapse recursive ──
function collapseR(id) {
    expandedIds.delete(id);
    const node = findNode(TREE_DATA, id);
    if (node && node.children) node.children.forEach(ch => collapseR(ch.id));
}

// ── Breadcrumb ──
function updateBread(node) {
    const trail = findParentPath(TREE_DATA, node.id, []) || [];
    trail.push(node);
    const bc = document.getElementById('breadcrumb');
    bc.innerHTML = trail.map((n, i) => {
        const cls = i === trail.length - 1 ? 'bread-active' : 'bread-item';
        return (i > 0 ? '<span class="bread-sep">›</span>' : '') + `<span class="${cls}" onclick="focusNode('${n.id}')">${n.icon || ''} ${n.name}</span>`;
    }).join('');
}

// ── Tooltip ──
function showTooltip(n, e) {
    clearTimeout(tooltipTimeout);
    tooltipTimeout = setTimeout(() => {
        let tt = document.getElementById('tooltip');
        if (!tt) { tt = document.createElement('div'); tt.id = 'tooltip'; document.body.appendChild(tt) }
        const childCount = n.children ? n.children.length : 0;
        const edgeCount = n.children ? n.children.filter(c => c.color === 'edge').length : 0;
        let html = `<div style="font-weight:700;margin-bottom:4px">${n.icon || ''} ${n.name}</div>`;
        if (n.desc) html += `<div style="opacity:.8;margin-bottom:4px">${n.desc}</div>`;
        if (n.edge) html += `<div style="color:#fca5a5;margin-bottom:4px">⚠ ${n.edge}</div>`;
        if (childCount) html += `<div style="margin-top:4px;font-size:10px;opacity:.6">📂 ${childCount} children${edgeCount ? ' • ⚠ ' + edgeCount + ' edge cases' : ''}</div>`;
        tt.innerHTML = html;
        tt.style.cssText = `position:fixed;top:${Math.min(e.clientY + 12, window.innerHeight - 150)}px;left:${Math.min(e.clientX + 12, window.innerWidth - 280)}px;background:#1e1b4b;border:1px solid #4c1d95;border-radius:8px;padding:10px 14px;font-size:11px;color:#e2e8f0;max-width:260px;z-index:1000;box-shadow:0 8px 30px rgba(0,0,0,.6);pointer-events:none;backdrop-filter:blur(8px)`;
    }, 400);
}

function hideTooltip() {
    clearTimeout(tooltipTimeout);
    const tt = document.getElementById('tooltip');
    if (tt) tt.remove();
}

// ── Focus / Navigate ──
function focusNode(id) {
    function expandPath(tree, tid) {
        if (tree.id === tid) return true;
        if (tree.children) for (const ch of tree.children) { if (expandPath(ch, tid)) { expandedIds.add(tree.id); return true } }
        return false;
    }
    expandPath(TREE_DATA, id);
    render();
    const nd = allNodes.find(n => n.id === id);
    if (nd) {
        const canvas = document.getElementById('canvas');
        canvas.scrollTo({ top: nd._y - 100, left: nd._x - 50, behavior: 'smooth' });
        // Highlight flash
        setTimeout(() => {
            const el = document.getElementById('node-' + id);
            if (el) { el.style.boxShadow = '0 0 20px 4px rgba(124,58,237,.7)'; setTimeout(() => { el.style.boxShadow = '' }, 1000) }
        }, 300);
    }
}

// ── Expand / Collapse All ──
function expandAll() {
    function addAll(n) { if (n.children && n.children.length) { expandedIds.add(n.id); n.children.forEach(addAll) } }
    addAll(TREE_DATA); render(); updateMinimap();
}
function collapseAll() {
    expandedIds.clear(); render();
    document.getElementById('breadcrumb').innerHTML = '<span class="bread-active">🌐 Platform</span>';
    updateMinimap();
}

// ── Search ──
function searchNodes(term) {
    searchTerm = term.toLowerCase().trim();
    if (searchTerm.length > 1) {
        function expandMatching(node) {
            let has = node.name.toLowerCase().includes(searchTerm) || (node.desc && node.desc.toLowerCase().includes(searchTerm));
            if (node.children) node.children.forEach(ch => { if (expandMatching(ch)) { expandedIds.add(node.id); has = true } });
            return has;
        }
        expandMatching(TREE_DATA);
    }
    render();
}

// ── Zoom ──
function zoomIn() { scale = Math.min(scale + 0.1, 2.5); applyZoom() }
function zoomOut() { scale = Math.max(scale - 0.1, 0.3); applyZoom() }
function resetZoom() { scale = 1; applyZoom(); document.getElementById('canvas').scrollTo({ top: 0, left: 0, behavior: 'smooth' }) }
function applyZoom() {
    document.getElementById('zl').textContent = Math.round(scale * 100) + '%';
    const c = document.getElementById('tree-container');
    c.style.transform = `scale(${scale})`;
    c.style.transformOrigin = 'top left';
    updateMinimap();
}

// ── Mini-map ──
function updateMinimap() {
    let mm = document.getElementById('minimap');
    if (!mm) {
        mm = document.createElement('canvas');
        mm.id = 'minimap';
        mm.style.cssText = 'position:fixed;bottom:10px;right:140px;width:150px;height:100px;border:1px solid #312e81;border-radius:8px;background:#0a0a14;z-index:99;cursor:pointer;opacity:.8';
        mm.addEventListener('click', e => {
            const rect = mm.getBoundingClientRect();
            const rx = (e.clientX - rect.left) / rect.width;
            const ry = (e.clientY - rect.top) / rect.height;
            const canvas = document.getElementById('canvas');
            const tc = document.getElementById('tree-container');
            canvas.scrollTo({ left: rx * tc.scrollWidth - canvas.clientWidth / 2, top: ry * tc.scrollHeight - canvas.clientHeight / 2, behavior: 'smooth' });
        });
        document.body.appendChild(mm);
    }
    const ctx = mm.getContext('2d');
    mm.width = 150; mm.height = 100;
    ctx.clearRect(0, 0, 150, 100);

    if (!allNodes.length) return;
    let mxX = 0, mxY = 0;
    allNodes.forEach(n => { mxX = Math.max(mxX, n._x + NODE_W); mxY = Math.max(mxY, n._y + n._h) });
    const sx = 148 / mxX, sy = 98 / mxY, s = Math.min(sx, sy);

    allNodes.forEach(n => {
        const col = getColor(n.color);
        ctx.fillStyle = col.bg;
        ctx.fillRect(n._x * s + 1, n._y * s + 1, NODE_W * s, Math.max(n._h * s, 2));
    });

    // Viewport indicator
    const canvas = document.getElementById('canvas');
    const tc = document.getElementById('tree-container');
    if (tc.scrollWidth > 0) {
        const vx = canvas.scrollLeft / tc.scrollWidth * 148;
        const vy = canvas.scrollTop / tc.scrollHeight * 98;
        const vw = canvas.clientWidth / tc.scrollWidth * 148;
        const vh = canvas.clientHeight / tc.scrollHeight * 98;
        ctx.strokeStyle = '#6d28d9'; ctx.lineWidth = 1.5;
        ctx.strokeRect(vx + 1, vy + 1, Math.max(vw, 10), Math.max(vh, 5));
    }
}

// ── Events ──
document.getElementById('canvas').addEventListener('wheel', e => {
    if (e.ctrlKey || e.metaKey) { e.preventDefault(); e.deltaY > 0 ? zoomOut() : zoomIn() }
}, { passive: false });

document.getElementById('canvas').addEventListener('scroll', () => { updateMinimap() });

document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === '+' || e.key === '=') { zoomIn(); e.preventDefault() }
    if (e.key === '-') { zoomOut(); e.preventDefault() }
    if (e.key === '0') { resetZoom(); e.preventDefault() }
    if (e.key === 'f' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); document.getElementById('searchBox').focus() }
    const cvs = document.getElementById('canvas');
    if (e.key === 'ArrowDown') cvs.scrollBy({ top: 80, behavior: 'smooth' });
    if (e.key === 'ArrowUp') cvs.scrollBy({ top: -80, behavior: 'smooth' });
    if (e.key === 'ArrowRight') cvs.scrollBy({ left: 80, behavior: 'smooth' });
    if (e.key === 'ArrowLeft') cvs.scrollBy({ left: -80, behavior: 'smooth' });
});

// ── Init ──
window.addEventListener('load', () => { setTimeout(() => { render() }, 150) });
