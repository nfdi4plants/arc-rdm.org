# Final content review and release preparation

Status: **In progress**

## Scope and constraints

Review the completed transition against the original site (`fdb9be0`) and the last content revision before reference/knowledge separation (`6dc4465`). Distinguish intentional editorial changes from accidental omissions. Explain how the current branch would reach production without performing any remote action.

Keep all work local, make granular commits, preserve the running previews, and leave the research source folder unchanged. No push, pull request creation, merge, deployment, DNS change, or w3id registration is authorized by this review.

## Tracker

- [x] Inspect the branch, baseline, deployment workflow, and earlier implementation trackers.
- [ ] Compare original articles, dictionary entries, tools, resources, and publication information.
- [ ] Check preservation of the ten moved explanations and original homepage destinations.
- [ ] Rebuild and verify original routes/anchors, internal links, reference routes, knowledge browsing, and search.
- [x] Inspect release prerequisites and document the proposed deployment process.
- [ ] Correct any confirmed omissions and rerun affected checks.
- [ ] Record findings, a condensed content-change report, and local preview availability.

## Findings and release procedure

The release review identified two small omissions: the PR and deployment workflows did not run `check:knowledge`, and README implied that the build's `CNAME` configures the domain for a custom Actions deployment. Both workflows now include the knowledge check, and README documents the authoritative GitHub Pages setting and the complete proposed release procedure. Remote Pages, DNS, and environment settings remain to be confirmed by the release operator; this review does not change them.

Content findings and final verification are pending.
