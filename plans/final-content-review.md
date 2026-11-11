# Final content review and release preparation

Status: **Complete — reviewed, corrected, and verified locally**

## Scope and constraints

Review the completed transition against the original site (`fdb9be0`) and the last content revision before reference/knowledge separation (`6dc4465`). Distinguish intentional editorial changes from accidental omissions. Explain how the current branch would reach production without performing any remote action.

Keep all work local, make granular commits, preserve the running previews, and leave the research source folder unchanged. No push, pull request creation, merge, deployment, DNS change, or w3id registration is authorized by this review.

## Tracker

- [x] Inspect the branch, baseline, deployment workflow, and earlier implementation trackers.
- [x] Compare original articles, dictionary entries, tools, resources, and publication information.
- [x] Check preservation of the ten moved explanations and original homepage destinations.
- [x] Rebuild and verify original routes/anchors, internal links, reference routes, knowledge browsing, and search.
- [x] Inspect release prerequisites and document the proposed deployment process.
- [x] Correct any confirmed omissions and rerun affected checks.
- [x] Record findings, a condensed content-change report, and local preview availability.

## Findings and release procedure

The release review identified two small omissions: the PR and deployment workflows did not run `check:knowledge`, and README implied that the build's `CNAME` configures the domain for a custom Actions deployment. Both workflows now include the knowledge check, and README documents the authoritative GitHub Pages setting and the complete proposed release procedure. Remote Pages, DNS, and environment settings remain to be confirmed by the release operator; this review does not change them.

The original-content audit found all 44 Markdown/MDX articles retained (16 unchanged and 28 edited at the start of this review), with no deleted original public assets. Resources, the publication bibliography, and partner information remain intact. No whole article, topic, tool entry, or dictionary entry was accidentally removed.

The reference-to-knowledge audit found eight of the ten explanation bodies unchanged apart from frontmatter and links. ARC RO-Crate retains all prior paragraphs and adds the three publication-profile explanations. The abstract-model overview was merged into the existing article without losing substantive concepts or examples. All 33 section anchors survive at their knowledge destinations, and all ten original graph destinations remain homepage links/cards. Reference URLs intentionally retain placeholders rather than these explanations.

Two useful details were condensed out of the earlier editorial rewrite and are now restored: a concrete CSV fragment selector (`measurements.csv#col=5`, corrected against [RFC 7111 section 2.2](https://www.rfc-editor.org/rfc/rfc7111.html#section-2.2) rather than copying the old malformed TSV example) and the usefulness of publishing negative/null results independently of journal articles.

## Condensed content-change report

| Area | What changed |
| --- | --- |
| ARC and the abstract model | ARC is explained as an RDM framework. The model is dataset-centred, with administrative, provenance, and semantic cores plus ISA, Workflow Run, and Datamap extensions. It is distinct from its concrete representations. |
| Workspace practices | Domain-adaptable workspaces replace the implication that every ARC must use one fixed scaffold. ISA folders, XLSX, Git, and CWL remain relevant implementation practices. ISA-ARC URLs and software names are preserved. |
| Publication and FDOs | ARC RO-Crate is the common publication representation. Transformation, validation, repository deposition, access, and PID assignment have separate responsibilities. Creating a crate does not itself publish data or make it FAIR. |
| Documentation and examples | Three complementary kinds of context and a measurements/derived-result example connect the model explanations. ISA examples remain labelled as such. Fragment scope, units, vocabulary, and process conditions are distinguished. |
| FAIRness, validation, and versioning | Replaced blanket completeness/compliance, automatic FAIRness, scientific-correctness, AI-readiness, lossless-conversion, and conflict-free-collaboration claims with scoped explanations. Git history is distinguished from scientific provenance and publication identifiers. The RDA source remains, while the old all-complete assessment table was intentionally removed. |
| Supporting material | Dictionary, DataHUB, and tool descriptions align with the new terminology without renaming software or removing entries. Resources, publication listings, and partner information are retained. Contradictory diagrams are no longer displayed; their original image files remain in the repository. |
| Browsing and references | Explanations now live in Learn ARC, with five topic groups and connected reading paths. All ten relocated explanations are searchable. Specification/PID routes deliberately remain clean placeholders or aliases for later specifications. |
| Homepage | Replaced graph hotspots with direct links and matching workspace/publication folders. The folders distinguish metadata from publication core profiles and show the transition to ARC RO-Crate. |

## Proposed go-live process

The existing GitHub Pages workflow is sufficient for publishing the website. See [README release process](../README.md#release-process) for the operational steps:

1. Review the local preview and passing checks. When remote publication is separately authorized, reconcile with current `main`, push `pids-and-design-iteration`, and open a PR to `main`.
2. Confirm the repository's Pages source is **GitHub Actions**, the custom domain is **arc-rdm.org**, DNS is correct, and HTTPS is enabled. Keep existing working DNS unchanged. Confirm any protected environment or branch approval requirements.
3. Let the PR build and all three checks pass, then merge the approved PR. The push to `main` triggers the production deployment; manual workflow dispatch is also a publishing action, not a staging preview.
4. Check the deployed homepage, knowledge pages, search, an old heading link, reference placeholders, aliases, and 404 behavior. Revert the release through a reviewed `main` commit if a code rollback is needed.

The private repository settings and current DNS configuration were not inspected; those remain release-time confirmations rather than verified blockers. The workflow's action versions exist and its Pages permissions, artifact path, and deployment dependency are configured. No host migration is needed for the static website. Real HTTP redirects and w3id registration remain separate work before using the placeholder/HTML-alias setup for machine-facing PID resolution.

Official hosting references: [publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).

## Verification

- Final build after the two text restorations: 127 generated pages; Astro reports zero errors, warnings, or hints.
- Original routes and fragments: all 77 routes and 91 heading anchors retained; 9,749 internal links checked successfully.
- Reference routes: 22 heading-only placeholders and six latest-version aliases verified; all 28 excluded from the actual 98-page Pagefind index.
- Knowledge: 25 searchable articles in five groups, the topic index, all ten relocated explanations, ten introductory/folder destinations, reading order, and 77 tag memberships verified.
- Both modified workflows parse as valid YAML and include the knowledge check. Their underlying build and verification commands pass locally; GitHub-hosted execution awaits a future authorized release.
- Both local preview roots return HTTP 200: `http://localhost:4321/` and `http://127.0.0.1:4322/`. The production preview serves the fresh search index.
- Focused background-browser review passes eight cases: both restored-content pages at 320/1440px in light/dark themes. Each returns HTTP 200, contains the restored text, and has no horizontal overflow or browser errors. Mobile screenshots were visually inspected. Evidence is in ignored `.local/qa/final-content-review.json`, `final-content-*.png`, and `.local/final-content-review-build.log`.

All edits remain local. No push, deployment, DNS change, w3id registration, or research-folder modification was performed.
