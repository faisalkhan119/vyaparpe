const fs = require('fs');

const path = 'src/components/product/ProductVariants.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add SkuMatrixItem to imports
content = content.replace(
    "import { VariantGroup, VariantOption, VariantDependency } from '@/data/products';",
    "import { VariantGroup, VariantOption, VariantDependency, SkuMatrixItem } from '@/data/products';"
);

// Add skuMatrix to props
const oldProps = `export default function ProductVariants({ 
    variantGroups = [],
    legacyVariants = [] 
}: { 
    variantGroups?: VariantGroup[],
    legacyVariants?: LegacyVariant[] 
}) {`;

const newProps = `export default function ProductVariants({ 
    variantGroups = [],
    legacyVariants = [],
    skuMatrix
}: { 
    variantGroups?: VariantGroup[],
    legacyVariants?: LegacyVariant[],
    skuMatrix?: SkuMatrixItem[]
}) {`;

content = content.replace(oldProps, newProps);

// Add Matrix Logic Helper
const searchParamsStart = `    const searchParams = useSearchParams();`;

const newHelper = `    const searchParams = useSearchParams();

    // Matrix Logic Helper
    const getDisabledOptions = (group: VariantGroup): string[] => {
        if (!skuMatrix || skuMatrix.length === 0) return [];

        const disabledIds: string[] = [];
        const currentSelections: Record<string, string> = {};
        variantGroups.forEach(g => {
            if (g.id !== group.id) {
                const sel = searchParams.get(g.id);
                if (sel) currentSelections[g.id] = sel;
            }
        });

        // For each option in this group, check if there is AT LEAST ONE sku in the matrix
        // that has this option AND satisfies all currently selected options in other groups.
        group.options.forEach(opt => {
            const hasValidCombo = skuMatrix.some(sku => {
                if (!sku.inStock || sku.stock === 0) return false;
                if (sku.attributes[group.id] !== opt.id) return false;
                
                // Check if all OTHER active selections match this SKU
                return Object.entries(currentSelections).every(([key, value]) => {
                    return sku.attributes[key] === value;
                });
            });

            if (!hasValidCombo) {
                disabledIds.push(opt.id);
            }
        });

        return disabledIds;
    };`;

content = content.replace(searchParamsStart, newHelper);

// Pass disabled options to VariantButton
const buttonRender = `return <VariantButton key={group.id} group={group} activeOptionId={activeOptionId} onChange={handleGroupVariantChange} />`;
const newButtonRender = `const disabledIds = getDisabledOptions(group);
                return <VariantButton key={group.id} group={group} activeOptionId={activeOptionId} onChange={handleGroupVariantChange} disabledOptionIds={disabledIds} />`;

content = content.replace(buttonRender, newButtonRender);

fs.writeFileSync(path, content);
console.log('Matrix Logic applied to ProductVariants');
